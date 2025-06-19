using Microsoft.EntityFrameworkCore;

namespace Empoli.Data.LeaveType;

[EntityTypeConfiguration(typeof(LeaveTypeConfig))]
public class LeaveType
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int MaxDays { get; set; }
    public bool RequireApproval { get; set; } = true;
    public bool PaidLeave { get; set; } = true;
}