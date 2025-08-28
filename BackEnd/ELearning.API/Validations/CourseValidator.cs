using ELearning.API.DTOS.CourseDtos;
using FluentValidation;

namespace ELearning.API.Validations
{
    public class CourseValidator : AbstractValidator<CourseUploadRequestDto>
    {
        public CourseValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Course name is required")
                .MaximumLength(100).WithMessage("Course name must not exceed 100 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Price)
    .GreaterThan(-1).WithMessage("Price can not be negative ");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("CategoryId must be a valid value");
        }
    }
}
