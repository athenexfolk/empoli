using FluentValidation;

namespace Empoli.Data.LeaveType.Dtos.Validators;

public class UpdateLeaveTypeDtoValidator : AbstractValidator<UpdateLeaveTypeDto>
{
    public UpdateLeaveTypeDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).MaximumLength(500);
        RuleFor(x => x.MaxDays).GreaterThanOrEqualTo(0);
    }
}
