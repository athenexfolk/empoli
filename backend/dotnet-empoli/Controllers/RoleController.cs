using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController(RoleManager<IdentityRole> roleManager) : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    [HttpGet]
    public ActionResult<IEnumerable<object>> GetRoles()
    {
        var roles = _roleManager.Roles.Select(r => new
        {
            r.Id,
            r.Name
        }).ToList();
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetRoleById(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return NotFound();
        return Ok(new
        {
            role.Id,
            role.Name
        });
    }

    [HttpPost]
    public async Task<ActionResult<object>> CreateRole(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return BadRequest("Role name is required");
        var result = await _roleManager.CreateAsync(new IdentityRole(name));
        if (!result.Succeeded) return BadRequest(result.Errors);
        var role = await _roleManager.FindByNameAsync(name);
        return CreatedAtAction(nameof(GetRoleById), new { id = role!.Id }, new { role.Id, role.Name });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return NotFound();
        var result = await _roleManager.DeleteAsync(role);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }
}
