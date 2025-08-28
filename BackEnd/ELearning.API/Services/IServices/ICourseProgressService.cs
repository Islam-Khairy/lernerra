using ELearning.API.DTOS.CourseProgressDtos;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public interface ICourseProgressService
    {
        Task MarkLessonAsCompleted(MarkLessonCompletedDto dto);
        Task<Result<CourseProgressDto>> GetCourseProgress(string userId, int courseId);
    }
}
