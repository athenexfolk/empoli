using AutoMapper;
using Empoli.Data;
using Empoli.Data.Auth;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Empoli.Services;

public class UserService(
    IMapper mapper,
    IValidator<CreateUserDto> createUserValidator,
    IValidator<ChangePasswordDto> changePasswordValidator,
    ILogger<UserService> logger,
    UserManager<IdentityUser> userManager,
    ApplicationDbContext context
)
{
    private readonly IMapper _mapper = mapper;
    private readonly IValidator<CreateUserDto> _createUserValidator = createUserValidator;
    private readonly IValidator<ChangePasswordDto> _changePasswordValidator = changePasswordValidator;
    private readonly ILogger<UserService> _logger = logger;
    private readonly UserManager<IdentityUser> _userManager = userManager;
    private readonly ApplicationDbContext _context = context;

    public async Task<List<UserDto>> GetUsersAsync()
    {
        var usersWithRoles = await (from user in _context.Users
                                    join userRole in _context.UserRoles on user.Id equals userRole.UserId into ur
                                    from userRole in ur.DefaultIfEmpty()
                                    join role in _context.Roles on userRole.RoleId equals role.Id into r
                                    from role in r.DefaultIfEmpty()
                                    group role by user into g
                                    select new
                                    {
                                        User = g.Key,
                                        Role = g.Where(x => x != null).Select(x => x.Name).FirstOrDefault()
                                    }).ToListAsync();

        var userDtos = usersWithRoles.Select(x =>
        {
            var dto = _mapper.Map<UserDto>(x.User);
            dto.Role = x.Role;
            return dto;
        }).ToList();

        return userDtos;
    }

    public async Task<UserDto?> GetUserByIdAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            _logger.LogWarning("User with ID {UserId} not found.", userId);
            return null;
        }
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> GetUserByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            _logger.LogWarning("User with email {Email} not found.", email);
            return null;
        }
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> CreateUserAsync(CreateUserDto dto)
    {
        var validationResult = await _createUserValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for CreateUserDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        IdentityUser user = new()
        {
            Email = dto.Email,
            UserName = dto.Email,
        };
        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            _logger.LogError("Failed to create user: {@Errors}", result.Errors);
            throw new ValidationException(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
        _logger.LogInformation("User {UserId} created successfully.", user.Id);
        return _mapper.Map<UserDto>(user); ;
    }

    public async Task<bool> ChangePasswordAsync(ChangePasswordDto dto)
    {
        var validationResult = await _changePasswordValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for ChangePasswordDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
        {
            _logger.LogWarning("User with email {Email} not found.", dto.Email);
            return false;
        }
        var result = await _userManager.ChangePasswordAsync(user, dto.Password, dto.NewPassword);
        if (!result.Succeeded)
        {
            _logger.LogError("Failed to change password for user {UserId}: {@Errors}", user.Id, result.Errors);
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
        _logger.LogInformation("Password changed successfully for user {UserId}.", user.Id);
        return true;
    }
}