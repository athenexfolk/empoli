using System.ComponentModel.DataAnnotations;
using Empoli.Data;
using Empoli.Data.Auth;
using Empoli.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(
    UserManager<IdentityUser> userManager,
    RoleManager<IdentityRole> roleManager,
    UserService userService,
    ApplicationDbContext context) : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly UserService _userService = userService;
    private readonly ApplicationDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(string id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto dto, string? roleName)
    {
        var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var user = await _userService.CreateUserAsync(dto);
            if (user == null)
            {
                await transaction.RollbackAsync();
                return BadRequest("User creation failed");
            }

            if (roleName != null)
            {
                var createdUser = await _userManager.FindByIdAsync(user.Id);
                if (createdUser == null)
                {
                    await transaction.RollbackAsync();
                    return NotFound("User not found");
                }
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role == null) { await transaction.RollbackAsync(); return NotFound("Role not found"); }
                var result = await _userManager.AddToRoleAsync(createdUser, roleName);
                if (!result.Succeeded)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(result.Errors);
                }
            }

            await transaction.CommitAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }
        catch (ValidationException ex)
        {
            await transaction.RollbackAsync();
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("{id}/change-password")]
    public async Task<IActionResult> ChangePassword(string id, ChangePasswordDto dto)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null) return NotFound("User not found");
        var success = await _userService.ChangePasswordAsync(dto);
        if (!success) return BadRequest("Password change failed");
        return NoContent();
    }

    [HttpPost("{id}/role")]
    public async Task<IActionResult> AddUserToRole(string id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound("User not found");
        var role = await _roleManager.FindByNameAsync(roleName);
        if (role == null) return NotFound("Role not found");
        var userRoles = await _userManager.GetRolesAsync(user);
        if (userRoles.Count > 0)
        {
            return BadRequest("User can have at most one role. Remove the existing role before adding a new one.");
        }
        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return Ok();
    }

    [HttpDelete("{id}/role")]
    public async Task<IActionResult> RemoveUserFromRole(string id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound("User not found");
        var result = await _userManager.RemoveFromRoleAsync(user, roleName);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }
}
