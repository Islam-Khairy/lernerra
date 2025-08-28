
using ELearning.API.Constants;
using ELearning.API.DTOS.CourseDtos;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public interface ICourseService
    {


        Task<Result> UploadCourseAsync(CourseUploadRequestDto dto);
        Task<Result<IEnumerable<CourseResponseDto>>> GetAllCoursesAsync(bool onlyApproved = false);
        Task<Result<IEnumerable<CourseResponseDto>>> GetAllCoursesByStatus(CourseStatus courseStatus);
        Task<Result<IEnumerable<CourseResponseDto>>> GetInstructorCoursesAsync(string instructorId);
        Task<Result<IEnumerable<CourseResponseDto>>> GetStudentCoursesAsync(string studentId);
        Task<Result<CourseResponseDto>> GetCourseByID(int courseID);
        Task<Result> UpdateCourseAsync(int courseId, CourseUploadRequestDto updatedCourseDto, string instructorId);
        Task<Result> UpdateCourseStatusAsync(CourseStatusDto dto);
        Task<Result> DeleteCourseAsync(int courseId);
        Task<Result> AddRatingAsync(int courseId, string studentId,int rating);
    }
}
