using Empoli.Data.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager) : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    [HttpGet]
    public ActionResult<IEnumerable<object>> GetUsers()
    {
        var users = _userManager.Users.Select(u => new
        {
            u.Id,
            u.UserName,
            u.Email
        }).ToList();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetUserById(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(new
        {
            user.Id,
            user.Email
        });
    }

    [HttpPost]
    public async Task<ActionResult<object>> CreateUser(CreateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = new IdentityUser
        {
            UserName = dto.Email,
            Email = dto.Email
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, new
        {
            user.Id,
            user.Email
        });
    }

    [HttpPost("{id}/roles")]
    public async Task<IActionResult> AddUserToRole(string id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound("User not found");
        var role = await _roleManager.FindByNameAsync(roleName);
        if (role == null) return NotFound("Role not found");
        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return Ok();
    }

    [HttpDelete("{id}/roles/{roleName}")]
    public async Task<IActionResult> RemoveUserFromRole(string id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound("User not found");
        var result = await _userManager.RemoveFromRoleAsync(user, roleName);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }
}
