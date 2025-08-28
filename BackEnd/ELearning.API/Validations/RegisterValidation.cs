using ELearning.API.DTOS.AuthDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class RegisterValidation:AbstractValidator<RegisterDto>
    {
        public RegisterValidation()
        {
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Full name cannot be empty")
                .MinimumLength(3)
                .WithMessage("Full name must be at least 3 characters long");
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email cannot be empty")
                .EmailAddress()
                .WithMessage("Invalid email format");
            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password cannot be empty")
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters long");
            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password)
                .WithMessage("Confirm password must match the password");
        }
    }
}
