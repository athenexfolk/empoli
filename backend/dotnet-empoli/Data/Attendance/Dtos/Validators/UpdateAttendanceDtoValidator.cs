using FluentValidation;

namespace Empoli.Data.Attendance.Dtos.Validators;

public class UpdateAttendanceDtoValidator : AbstractValidator<UpdateAttendanceDto>
{
    public UpdateAttendanceDtoValidator()
    {
        RuleFor(x => x.Status).IsInEnum();
        RuleFor(x => x.Note).MaximumLength(500);
    }
}
