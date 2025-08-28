using ELearning.API.DTOS.LessonDtos;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public  interface ILessonService
    {
        Task<Result<List<LessonResponseDto>>> GetAllLessonsByCourseIdAsync(int courseId);
        Task<Result<LessonResponseDto>> GetLessonById(int id);
        Task<Result> CreateLessonAsync(LessonRequestDto lessonDto);
        Task<Result> UpdateLesson(int id, LessonUpdateDto lessonDto);
        Task<Result> DeleteLessonAsync(int id);
    }
}
