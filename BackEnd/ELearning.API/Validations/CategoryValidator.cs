using ELearning.API.DTOS.CategoryDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class CategoryValidator:AbstractValidator<CreateCategoryRequestDto>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name)
                .NotEmpty().WithMessage("Category name is required.")
                .MaximumLength(100).WithMessage("Category name cannot exceed 100 characters.");
            RuleFor(c => c.Description)
                .MaximumLength(500).WithMessage("Category description cannot exceed 500 characters.");
        }
    }
}
