using ELearning.API.DTOS.UserDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class AddAdminValidator:AbstractValidator<AddAdminDto>
    {
        public AddAdminValidator()
        {
            RuleFor(a => a.Email).NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email is invalid");
        }
    }
}
