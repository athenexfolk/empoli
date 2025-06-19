using Microsoft.EntityFrameworkCore;

namespace Empoli.Data.Attendance;

public enum AttendanceStatus
{
    Present,
    Absent,
    Late,
    PartialLeave,
    OnLeave,
    Incomplete,
    PendingCorrection,
    Holiday,
}

[EntityTypeConfiguration(typeof(AttendanceConfig))]
public class Attendance
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan ClockInTime { get; set; }
    public TimeSpan? ClockOutTime { get; set; }
    public string Note { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public AttendanceStatus Status { get; set; } = AttendanceStatus.PendingCorrection;
    public double? TotalHoursWorked { get; set; }
    public double? OvertimeHours { get; set; }
    public bool IsOvertimeApproved { get; set; }
}