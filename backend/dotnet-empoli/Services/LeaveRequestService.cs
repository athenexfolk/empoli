using AutoMapper;
using Empoli.Data;
using Empoli.Data.LeaveRequest;
using Empoli.Data.LeaveRequest.Dtos;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Empoli.Services;

public class LeaveRequestService(
  ApplicationDbContext context,
  IMapper mapper,
  IValidator<CreateLeaveRequestDto> createValidator,
  IValidator<UpdateLeaveRequestDto> updateValidator,
  ILogger<LeaveRequestService> logger
)
{
  private readonly ApplicationDbContext _context = context;
  private readonly IMapper _mapper = mapper;
  private readonly IValidator<CreateLeaveRequestDto> _createValidator = createValidator;
  private readonly IValidator<UpdateLeaveRequestDto> _updateValidator = updateValidator;
  private readonly ILogger<LeaveRequestService> _logger = logger;

  public async Task<LeaveRequest> CreateRequestAsync(CreateLeaveRequestDto dto)
  {
    var validationResult = await _createValidator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var leaveRequest = _mapper.Map<LeaveRequest>(dto);
    _context.LeaveRequests.Add(leaveRequest);
    await _context.SaveChangesAsync();
    return leaveRequest;
  }

  public async Task<LeaveRequest?> GetRequestByIdAsync(Guid requestId)
  {
    return await _context.LeaveRequests.FindAsync(requestId);
  }

  public async Task<IEnumerable<LeaveRequest>> GetRequestsByEmployeeIdAsync(Guid employeeId)
  {
    return await _context.LeaveRequests
      .Where(r => r.EmployeeId == employeeId)
      .ToListAsync();
  }

  public async Task<IEnumerable<LeaveRequest>> GetAllRequestsAsync()
  {
    return await _context.LeaveRequests.ToListAsync();
  }

  public async Task<LeaveRequest> UpdateRequestAsync(Guid requestId, UpdateLeaveRequestDto dto)
  {
    var validationResult = await _updateValidator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    var leaveRequest = await _context.LeaveRequests.FindAsync(requestId) ?? throw new KeyNotFoundException("Leave request not found.");
    _mapper.Map(dto, leaveRequest);
    _context.LeaveRequests.Update(leaveRequest);
    await _context.SaveChangesAsync();
    return leaveRequest;
  }

  public async Task<bool> ApproveRequestAsync(Guid requestId)
  {
    var leaveRequest = await _context.LeaveRequests.FindAsync(requestId);
    if (leaveRequest == null || leaveRequest.Status != LeaveRequestStatus.Pending)
    {
      return false;
    }

    leaveRequest.Status = LeaveRequestStatus.Approved;
    leaveRequest.ApprovedAt = DateTime.UtcNow;
    _context.LeaveRequests.Update(leaveRequest);
    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<bool> RejectRequestAsync(Guid requestId)
  {
    var leaveRequest = await _context.LeaveRequests.FindAsync(requestId);
    if (leaveRequest == null || leaveRequest.Status != LeaveRequestStatus.Pending)
    {
      return false;
    }

    leaveRequest.Status = LeaveRequestStatus.Rejected;
    _context.LeaveRequests.Update(leaveRequest);
    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<bool> CancelRequestAsync(Guid requestId)
  {
    var leaveRequest = await _context.LeaveRequests.FindAsync(requestId);
    if (leaveRequest == null || leaveRequest.Status != LeaveRequestStatus.Pending)
    {
      return false;
    }

    leaveRequest.Status = LeaveRequestStatus.Cancelled;
    _context.LeaveRequests.Update(leaveRequest);
    await _context.SaveChangesAsync();
    return true;
  }
}