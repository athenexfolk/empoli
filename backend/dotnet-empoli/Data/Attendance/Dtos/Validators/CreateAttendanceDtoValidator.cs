using FluentValidation;

namespace Empoli.Data.Attendance.Dtos.Validators;

public class CreateAttendanceDtoValidator : AbstractValidator<CreateAttendanceDto>
{
    public CreateAttendanceDtoValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.ClockInTime).NotEmpty();
        RuleFor(x => x.Status).IsInEnum();
        RuleFor(x => x.Note).MaximumLength(500);
    }
}
