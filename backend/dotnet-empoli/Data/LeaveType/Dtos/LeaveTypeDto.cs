namespace Empoli.Data.LeaveType.Dtos;

public class LeaveTypeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int MaxDays { get; set; }
    public bool RequireApproval { get; set; }
    public bool PaidLeave { get; set; }
}
