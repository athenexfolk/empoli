using AutoMapper;
using AutoMapper.QueryableExtensions;
using Empoli.Data.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Empoli.Services;

public class RoleService(
    IMapper mapper,
    ILogger<RoleService> logger,
    RoleManager<IdentityRole> roleManager)
{
    private readonly IMapper _mapper = mapper;
    private readonly ILogger<RoleService> _logger = logger;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    public async Task<List<RoleDto>> GetRolesAsync()
    {
        return await _roleManager.Roles
            .AsNoTracking()
            .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<RoleDto?> GetRoleByIdAsync(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null)
        {
            _logger.LogWarning("Role with ID {RoleId} not found.", id);
            return null;
        }
        return _mapper.Map<RoleDto>(role);
    }

    public async Task<RoleDto?> CreateRoleAsync(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            _logger.LogWarning("Attempted to create role with empty name.");
            return null;
        }
        var role = new IdentityRole(name);
        var result = await _roleManager.CreateAsync(role);
        if (!result.Succeeded)
        {
            _logger.LogError("Failed to create role {RoleName}. Errors: {Errors}",
                name, string.Join(", ", result.Errors.Select(e => e.Description)));
            return null;
        }
        _logger.LogInformation("Successfully created role {RoleName} with ID {RoleId}.", name, role.Id);
        return _mapper.Map<RoleDto>(role);
    }

    public async Task<bool> DeleteRoleAsync(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null)
        {
            _logger.LogWarning("Attempted to delete non-existent role with ID {RoleId}.", id);
            return false;
        }
        var result = await _roleManager.DeleteAsync(role);
        if (!result.Succeeded)
        {
            _logger.LogError("Failed to delete role {RoleName}. Errors: {Errors}",
                role.Name, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        _logger.LogInformation("Successfully deleted role {RoleName} with ID {RoleId}.", role.Name, id);
        return true;
    }

    public async Task<bool> RoleExistsAsync(string name)
    {
        return await _roleManager.RoleExistsAsync(name);
    }
}
