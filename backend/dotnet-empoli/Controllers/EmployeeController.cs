using Empoli.Data.Employee.Dtos;
using Empoli.Services;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController(EmployeeService employeeService) : ControllerBase
{
    private readonly EmployeeService _employeeService = employeeService;

    [HttpGet]
    public async Task<ActionResult<List<EmployeeDto>>> GetEmployees(CancellationToken cancellationToken)
    {
        var employees = await _employeeService.GetEmployeesAsync(cancellationToken);
        return Ok(employees);
    }

    [HttpGet("{id}", Name = nameof(GetEmployeeById))]
    public async Task<ActionResult<EmployeeDto>> GetEmployeeById(Guid id, CancellationToken cancellationToken)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id, cancellationToken);
        if (employee == null) return NotFound();
        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeDto>> CreateEmployee(CreateEmployeeDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            var employee = await _employeeService.CreateEmployeeAsync(dto, cancellationToken);
            if (employee == null) return BadRequest("Creation failed");
            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<EmployeeDto>> UpdateEmployee(Guid id, UpdateEmployeeDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (!await _employeeService.EmployeeExistsAsync(id, cancellationToken)) return NotFound();
        try
        {
            var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, dto, cancellationToken);
            if (updatedEmployee == null) return BadRequest("Update failed");
            return Ok(updatedEmployee);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id, CancellationToken cancellationToken)
    {
        if (!await _employeeService.EmployeeExistsAsync(id, cancellationToken)) return NotFound();
        var deleted = await _employeeService.DeleteEmployeeAsync(id, cancellationToken);
        if (!deleted) return BadRequest("Delete failed");
        return NoContent();
    }
}
