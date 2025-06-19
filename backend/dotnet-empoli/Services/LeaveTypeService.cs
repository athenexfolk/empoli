using AutoMapper;
using AutoMapper.QueryableExtensions;
using Empoli.Data;
using Empoli.Data.LeaveType;
using Empoli.Data.LeaveType.Dtos;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Empoli.Services;

public class LeaveTypeService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidator<CreateLeaveTypeDto> createValidator,
    IValidator<UpdateLeaveTypeDto> updateValidator,
    ILogger<LeaveTypeService> logger)
{
    private readonly ApplicationDbContext _context = context;
    private readonly IMapper _mapper = mapper;
    private readonly IValidator<CreateLeaveTypeDto> _createValidator = createValidator;
    private readonly IValidator<UpdateLeaveTypeDto> _updateValidator = updateValidator;
    private readonly ILogger<LeaveTypeService> _logger = logger;

    public async Task<List<LeaveTypeDto>> GetLeaveTypesAsync(CancellationToken cancellationToken)
    {
        return await _context.LeaveTypes
            .AsNoTracking()
            .ProjectTo<LeaveTypeDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }

    public async Task<LeaveTypeDto?> GetLeaveTypeByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.LeaveTypes
            .AsNoTracking()
            .ProjectTo<LeaveTypeDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(lt => lt.Id == id, cancellationToken);
    }

    public async Task<LeaveTypeDto> CreateLeaveTypeAsync(CreateLeaveTypeDto dto, CancellationToken cancellationToken)
    {
        var validationResult = await _createValidator.ValidateAsync(dto, cancellationToken);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for CreateLeaveTypeDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        var leaveType = _mapper.Map<LeaveType>(dto);
        _context.LeaveTypes.Add(leaveType);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Created new leave type with Id: {LeaveTypeId}", leaveType.Id);
        return _mapper.Map<LeaveTypeDto>(leaveType);
    }

    public async Task<LeaveTypeDto?> UpdateLeaveTypeAsync(Guid id, UpdateLeaveTypeDto dto, CancellationToken cancellationToken)
    {
        var validationResult = await _updateValidator.ValidateAsync(dto, cancellationToken);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for UpdateLeaveTypeDto: {@Errors}", validationResult.Errors);
            throw new ValidationException(validationResult.Errors);
        }
        var leaveType = await _context.LeaveTypes.FindAsync([id], cancellationToken);
        if (leaveType == null)
        {
            _logger.LogWarning("LeaveType with Id {LeaveTypeId} not found for update.", id);
            return null;
        }
        _mapper.Map(dto, leaveType);
        _context.LeaveTypes.Update(leaveType);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Updated leave type with Id: {LeaveTypeId}", leaveType.Id);
        return _mapper.Map<LeaveTypeDto>(leaveType);
    }

    public async Task<bool> DeleteLeaveTypeAsync(Guid id, CancellationToken cancellationToken)
    {
        var leaveType = await _context.LeaveTypes.FindAsync([id], cancellationToken: cancellationToken);
        if (leaveType == null)
        {
            _logger.LogWarning("LeaveType with Id {LeaveTypeId} not found for deletion.", id);
            return false;
        }
        _context.LeaveTypes.Remove(leaveType);
        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Deleted leave type with Id: {LeaveTypeId}", id);
        return true;
    }

    public async Task<bool> LeaveTypeExistsAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.LeaveTypes.AnyAsync(lt => lt.Id == id, cancellationToken);
    }
}