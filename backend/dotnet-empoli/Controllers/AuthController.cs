using Empoli.Data.Auth;
using Empoli.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Empoli.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService, EmployeeService employeeService, UserManager<IdentityUser> userManager) : ControllerBase
{
    private readonly AuthService _authService = authService;
    private readonly EmployeeService _employeeService = employeeService;
    private readonly UserManager<IdentityUser> _userManager = userManager;

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _authService.ValidateUserAsync(dto.Email, dto.Password);
        if (user != null)
        {
            var token = await _authService.GenerateJwtTokenAsync(user);
            return Ok(new { token });
        }
        return Unauthorized();
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
    {
        var email = User.Identity?.Name;

        if (email == null)
        {
            return Unauthorized();
        }

        var employee = await _employeeService.GetEmployeeByEmailAsync(email, cancellationToken);
        if (employee != null)
        {
            return Ok(employee);
        }
        return NotFound();
    }
}
