using FluentValidation;

namespace Empoli.Data.Auth.Validators;

public class ChangePasswordDtoValidator : AbstractValidator<ChangePasswordDto>
{
    public ChangePasswordDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Email must be a valid email address.")
            .MaximumLength(100)
            .WithMessage("Email must not exceed 100 characters.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Current password is required.")
            .MinimumLength(1)
            .WithMessage("Current password cannot be empty.")
            .MaximumLength(100)
            .WithMessage("Current password must not exceed 100 characters.");

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .WithMessage("New password is required.")
            .MinimumLength(8)
            .WithMessage("New password must be at least 8 characters long.")
            .MaximumLength(100)
            .WithMessage("New password must not exceed 100 characters.")
            .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$")
            .WithMessage("New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.")
            .NotEqual(x => x.Password)
            .WithMessage("New password must be different from the current password.");
    }
}
