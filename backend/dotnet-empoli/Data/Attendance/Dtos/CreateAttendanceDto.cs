namespace Empoli.Data.Attendance.Dtos;

public class CreateAttendanceDto
{
    public Guid EmployeeId { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan ClockInTime { get; set; }
    public TimeSpan? ClockOutTime { get; set; }
    public string Note { get; set; } = string.Empty;
    public AttendanceStatus Status { get; set; }
}
