using ELearning.API.DTOS.LessonDtos;
using FluentValidation;

namespace ELearning.API.Validations.Lesson
{
    public class LessonUpdateValidator : AbstractValidator<LessonUpdateDto>
    {
        public LessonUpdateValidator()
        {
            RuleFor(x => x.Title).NotEmpty()
                .WithMessage("Title cannot be empty")
                .MinimumLength(10)
                .WithMessage("Title must be at least 10 characters long");

            RuleFor(x => x.Description).NotEmpty()
                .WithMessage("Description cannot be empty")
                .MinimumLength(30)
                .WithMessage("Description must be at least 40 characters long");

            RuleFor(x => x.VedioURL).NotEmpty()
                .WithMessage("VedioURL cannot be empty")
                .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute))
                .WithMessage("Video URL must be a valid full URL");

            RuleFor(x => x.Duration).NotEmpty()
                .WithMessage("Duration of lesson cannot be empty");
        }
    }
}
