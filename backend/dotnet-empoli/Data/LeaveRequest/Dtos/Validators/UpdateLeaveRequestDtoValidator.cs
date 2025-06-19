using FluentValidation;

namespace Empoli.Data.LeaveRequest.Dtos.Validators;

public class UpdateLeaveRequestDtoValidator : AbstractValidator<UpdateLeaveRequestDto>
{
    public UpdateLeaveRequestDtoValidator()
    {
        RuleFor(x => x.StartDate).NotEmpty().When(x => x.StartDate.HasValue);
        RuleFor(x => x.EndDate).NotEmpty().When(x => x.EndDate.HasValue).GreaterThanOrEqualTo(x => x.StartDate).When(x => x.StartDate.HasValue && x.EndDate.HasValue);
        RuleFor(x => x.Reason).MaximumLength(500);
        RuleFor(x => x.Status).IsInEnum().When(x => x.Status.HasValue);
    }
}
