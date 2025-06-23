using Empoli.Data.Auth;
using Empoli.Services;
using Microsoft.AspNetCore.Mvc;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController(RoleService roleService) : ControllerBase
{
    private readonly RoleService _roleService = roleService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
    {
        var roles = await _roleService.GetRolesAsync();
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RoleDto>> GetRoleById(string id)
    {
        var role = await _roleService.GetRoleByIdAsync(id);
        if (role == null) return NotFound();
        return Ok(role);
    }

    [HttpPost]
    public async Task<ActionResult<RoleDto>> CreateRole(string name)
    {
        var role = await _roleService.CreateRoleAsync(name);
        if (role == null) return BadRequest("Role creation failed");
        return CreatedAtAction(nameof(GetRoleById), new { id = role.Id }, role);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(string id)
    {
        var success = await _roleService.DeleteRoleAsync(id);
        if (!success) return NotFound("Role not found or could not be deleted");
        return NoContent();
    }
}
