using dotnet_empoli.Dtos;
using dotnet_empoli.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_empoli.Controllers;
[Route("api/[controller]")]
[ApiController]
public class EmployeeController(EmployeeService employeeService) : ControllerBase
{
    private readonly EmployeeService _employeeService = employeeService;

    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await _employeeService.GetEmployeesAsync();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployeeById(Guid id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        if (employee == null) return NotFound();
        return Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEmployee(CreateEmployeeDto dto)
    {
        var employee = await _employeeService.CreateEmployeeAsync(dto);
        return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(Guid id, UpdateEmployeeDto dto)
    {
        if (!await _employeeService.EmployeeExistsAsync(id)) return NotFound();
        var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, dto);
        if (updatedEmployee == null) return BadRequest("Update failed");
        return Ok(updatedEmployee);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id)
    {
        if (!await _employeeService.EmployeeExistsAsync(id)) return NotFound();
        var deleted = await _employeeService.DeleteEmployeeAsync(id);
        if (!deleted) return BadRequest("Delete failed");
        return NoContent();
    }
}
