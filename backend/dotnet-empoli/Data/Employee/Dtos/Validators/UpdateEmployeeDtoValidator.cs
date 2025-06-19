using FluentValidation;

namespace Empoli.Data.Employee.Dtos.Validators;

public class UpdateEmployeeDtoValidator : AbstractValidator<UpdateEmployeeDto>
{
    public UpdateEmployeeDtoValidator()
    {
        RuleFor(x => x.FirstName)
            .MaximumLength(100).WithMessage("First name must be at most 100 characters long.");

        RuleFor(x => x.LastName)
            .MaximumLength(100).WithMessage("Last name must be at most 100 characters long.");

        RuleFor(x => x.DateOfBirth)
            .LessThan(DateTime.Today).When(x => x.DateOfBirth.HasValue).WithMessage("Date of birth must be in the past.");

        RuleFor(x => x.Email)
            .EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email)).WithMessage("Invalid email address.");

        RuleFor(x => x.PhoneNumber)
            .MaximumLength(20).WithMessage("Phone number must be at most 20 characters long.");

        RuleFor(x => x.HireDate)
            .LessThanOrEqualTo(DateTime.Today).When(x => x.HireDate.HasValue).WithMessage("Hire date cannot be in the future.");

        RuleFor(x => x.JobTitle)
            .MaximumLength(100).WithMessage("Job title must be at most 100 characters long.");

        RuleFor(x => x.Department)
            .MaximumLength(100).WithMessage("Department must be at most 100 characters long.");
    }
}