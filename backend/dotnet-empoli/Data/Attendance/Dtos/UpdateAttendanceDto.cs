namespace Empoli.Data.Attendance.Dtos;

public class UpdateAttendanceDto
{
    public TimeSpan? ClockOutTime { get; set; }
    public string Note { get; set; } = string.Empty;
    public int Status { get; set; }
}
