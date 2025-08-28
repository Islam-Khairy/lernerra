using ELearning.API.DTOS.UserDto;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class UpdateUserValidator:AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Full name is required.")
                .MaximumLength(100).WithMessage("Full name must not exceed 100 characters.");
           
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");
           
            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.")
                .Matches(@"^01[0-2,5]{1}[0-9]{8}$").WithMessage("Invalid phone number format.");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("Profile picture URL is required.")
                .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute)).WithMessage("Invalid profile picture URL format.");

        }
    }
}
