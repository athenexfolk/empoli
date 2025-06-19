using Empoli.Data;
using Empoli.Data.LeaveType;
using Microsoft.EntityFrameworkCore;

namespace Empoli.Services;

public class LeaveTypeService(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    public async Task<List<LeaveType>> GetLeaveTypesAsync()
    {
        return await _context.LeaveTypes.ToListAsync();
    }

    public async Task<LeaveType?> GetLeaveTypeByIdAsync(Guid id)
    {
        return await _context.LeaveTypes.FindAsync(id);
    }

    public async Task<LeaveType> CreateLeaveTypeAsync(LeaveType leaveType)
    {
        _context.LeaveTypes.Add(leaveType);
        await _context.SaveChangesAsync();
        return leaveType;
    }

    public async Task<LeaveType?> UpdateLeaveTypeAsync(Guid id, LeaveType leaveType)
    {
        var existingLeaveType = await _context.LeaveTypes.FindAsync(id);
        if (existingLeaveType == null) return null;

        existingLeaveType.Name = leaveType.Name;
        existingLeaveType.MaxDays = leaveType.MaxDays;
        existingLeaveType.Description = leaveType.Description;

        _context.LeaveTypes.Update(existingLeaveType);
        await _context.SaveChangesAsync();
        return existingLeaveType;
    }

    public async Task<bool> DeleteLeaveTypeAsync(Guid id)
    {
        var leaveType = await _context.LeaveTypes.FindAsync(id);
        if (leaveType == null) return false;

        _context.LeaveTypes.Remove(leaveType);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> LeaveTypeExistsAsync(Guid id)
    {
        return await _context.LeaveTypes.AnyAsync(lt => lt.Id == id);
    }
}