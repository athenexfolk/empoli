using Empoli.Data.LeaveType.Dtos;
using Empoli.Services;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;

namespace Empoli.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LeaveTypeController(LeaveTypeService leaveTypeService) : ControllerBase
{
    private readonly LeaveTypeService _leaveTypeService = leaveTypeService;

    [HttpGet]
    public async Task<ActionResult<List<LeaveTypeDto>>> GetLeaveTypes(CancellationToken cancellationToken)
    {
        var leaveTypes = await _leaveTypeService.GetLeaveTypesAsync(cancellationToken);
        return Ok(leaveTypes);
    }

    [HttpGet("{id}", Name = nameof(GetLeaveTypeById))]
    public async Task<ActionResult<LeaveTypeDto>> GetLeaveTypeById(Guid id, CancellationToken cancellationToken)
    {
        var leaveType = await _leaveTypeService.GetLeaveTypeByIdAsync(id, cancellationToken);
        if (leaveType == null) return NotFound();
        return Ok(leaveType);
    }

    [HttpPost]
    public async Task<ActionResult<LeaveTypeDto>> CreateLeaveType(CreateLeaveTypeDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            var leaveType = await _leaveTypeService.CreateLeaveTypeAsync(dto, cancellationToken);
            if (leaveType == null) return BadRequest("Creation failed");
            return CreatedAtAction(nameof(GetLeaveTypeById), new { id = leaveType.Id }, leaveType);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<LeaveTypeDto>> UpdateLeaveType(Guid id, UpdateLeaveTypeDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (!await _leaveTypeService.LeaveTypeExistsAsync(id, cancellationToken)) return NotFound();
        try
        {
            var updatedLeaveType = await _leaveTypeService.UpdateLeaveTypeAsync(id, dto, cancellationToken);
            if (updatedLeaveType == null) return BadRequest("Update failed");
            return Ok(updatedLeaveType);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLeaveType(Guid id, CancellationToken cancellationToken)
    {
        if (!await _leaveTypeService.LeaveTypeExistsAsync(id, cancellationToken)) return NotFound();
        var deleted = await _leaveTypeService.DeleteLeaveTypeAsync(id, cancellationToken);
        if (!deleted) return BadRequest("Delete failed");
        return NoContent();
    }
}
