using dotnet_empoli.Data;
using dotnet_empoli.Dtos;
using dotnet_empoli.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_empoli.Services;

public class EmployeeService(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    public async Task<List<Employee>> GetEmployeesAsync()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee?> GetEmployeeByIdAsync(Guid id)
    {
        return await _context.Employees.FindAsync(id);
    }

    public async Task<Employee> CreateEmployeeAsync(CreateEmployeeDto dto)
    {
        var employee = new Employee
        {
            Code = dto.Code,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<Employee?> UpdateEmployeeAsync(Guid id, UpdateEmployeeDto dto)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return null;
        employee.Code = dto.Code;
        employee.FirstName = dto.FirstName;
        employee.LastName = dto.LastName;
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<bool> DeleteEmployeeAsync(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return false;
        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> EmployeeExistsAsync(Guid id)
    {
        return await _context.Employees.AnyAsync(e => e.Id == id);
    }

    public async Task<bool> EmployeeCodeExistsAsync(string code)
    {
        return await _context.Employees.AnyAsync(e => e.Code == code);
    }
}
