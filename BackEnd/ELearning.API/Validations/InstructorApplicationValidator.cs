using ELearning.API.DTOS.InstructorApplicationDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class InstructorApplicationValidator:AbstractValidator<InstructorApplicationRequestDto>
    {
        public InstructorApplicationValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Fullname cannot be empty")
                .MaximumLength(40).WithMessage("Fullname must be less than 20 characters long");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("phone number cannot be empty")
                .Matches("^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}").WithMessage("phone number is invalid number");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email cannot be empty")
                .EmailAddress().WithMessage("Email is invaild");

            RuleFor(x => x.Specialization)
                .NotEmpty().WithMessage("Specialization cannot be empty")
                .MaximumLength(20).WithMessage("Specialization must be less than 20 characters long");

            RuleFor(x => x.CvUrl)
            .NotEmpty().WithMessage("CV URL cannot be empty");

        }
    }
}
