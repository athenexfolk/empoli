using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Empoli.Services;

public class AuthService(IConfiguration configuration, UserManager<IdentityUser> userManager)
{
    private readonly IConfiguration _configuration = configuration;
    private readonly UserManager<IdentityUser> _userManager = userManager;

    public async Task<IdentityUser?> ValidateUserAsync(string username, string password)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user != null && await _userManager.CheckPasswordAsync(user, password))
        {
            return user;
        }
        return null;
    }

    public async Task<string> GenerateJwtTokenAsync(IdentityUser user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var userRoles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.NameIdentifier, user.Id)
        };
        claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
