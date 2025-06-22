using AutoMapper;
using AutoMapper.QueryableExtensions;
using Empoli.Data;
using Empoli.Data.Employee;
using Empoli.Data.Employee.Dtos;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Empoli.Services;

public class EmployeeService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidator<CreateEmployeeDto> createValidator,
    IValidator<UpdateEmployeeDto> updateValidator,
    ILogger<EmployeeService> logger)
{
    private readonly ApplicationDbContext _context = context;
    private readonly IMapper _mapper = mapper;
    private readonly IValidator<CreateEmployeeDto> _createValidator = createValidator;
    private readonly IValidator<UpdateEmployeeDto> _updateValidator = updateValidator;
    private readonly ILogger<EmployeeService> _logger = logger;

    public async Task<List<EmployeeDto>> GetEmployeesAsync(CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }

    public async Task<EmployeeDto?> GetEmployeeByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
    }

    public async Task<EmployeeDto?> GetEmployeeByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await _context.Employees
            .AsNoTracking()
            .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(e => e.Email == email, cancellationToken);
    }

    public async Task<EmployeeDto> CreateEmployeeAsync(CreateEmployeeDto dto, CancellationToken cancellationToken)
    {
        var validationResult = await _createValidator.ValidateAsync(dto, cancellationToken);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for CreateEmployeeDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        var employee = _mapper.Map<Employee>(dto);
        employee.EmployeeId = await GenerateUniqueEmployeeIdAsync(cancellationToken);
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Created new employee with Id: {EmployeeId}", employee.Id);
        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto?> UpdateEmployeeAsync(Guid id, UpdateEmployeeDto dto, CancellationToken cancellationToken)
    {
        var validationResult = await _updateValidator.ValidateAsync(dto, cancellationToken);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for UpdateEmployeeDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        var employee = await _context.Employees.FindAsync([id], cancellationToken);
        if (employee == null)
        {
            _logger.LogWarning("Employee with Id {EmployeeId} not found for update.", id);
            return null;
        }
        _mapper.Map(dto, employee);
        employee.UpdatedAt = DateTime.UtcNow;
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Updated employee with Id: {EmployeeId}", employee.Id);
        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<bool> DeleteEmployeeAsync(Guid id, CancellationToken cancellationToken)
    {
        var employee = await _context.Employees.FindAsync([id], cancellationToken: cancellationToken);
        if (employee == null)
        {
            _logger.LogWarning("Employee with Id {EmployeeId} not found for deletion.", id);
            return false;
        }
        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Deleted employee with Id: {EmployeeId}", id);
        return true;
    }

    public async Task<bool> EmployeeExistsAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Employees.AnyAsync(e => e.Id == id, cancellationToken);
    }

    public async Task<bool> EmployeeCodeExistsAsync(string code, CancellationToken cancellationToken)
    {
        return await _context.Employees.AnyAsync(e => e.EmployeeId == code, cancellationToken);
    }

    private async Task<string> GenerateUniqueEmployeeIdAsync(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var prefix = $"EMP{now.ToString("yyyyMM", CultureInfo.InvariantCulture)}";
        var countThisMonth = await _context.Employees.CountAsync(e => e.CreatedAt.Year == now.Year && e.CreatedAt.Month == now.Month, cancellationToken: cancellationToken);
        var number = countThisMonth + 1;
        var employeeId = $"{prefix}{number:D3}";
        return employeeId;
    }
}
