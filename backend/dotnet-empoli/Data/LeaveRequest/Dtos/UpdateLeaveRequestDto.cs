namespace Empoli.Data.LeaveRequest.Dtos;

public class UpdateLeaveRequestDto
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Reason { get; set; }
    public int? Status { get; set; } // Use enum int value
}
