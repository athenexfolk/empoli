namespace Empoli.Data.LeaveType.Dtos;

public class UpdateLeaveTypeDto
{
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public int MaxDays { get; set; }
	public bool RequireApproval { get; set; } = true;
	public bool PaidLeave { get; set; } = true;
}