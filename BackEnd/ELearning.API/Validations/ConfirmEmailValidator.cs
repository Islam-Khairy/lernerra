using ELearning.API.DTOS.AuthDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class ConfirmEmailValidator:AbstractValidator<ConfirmEmailDto>
    {
        public ConfirmEmailValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Code).NotEmpty();
        }
    }
}
