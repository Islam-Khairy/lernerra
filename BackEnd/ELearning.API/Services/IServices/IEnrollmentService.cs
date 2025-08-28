using ELearning.API.DTOS.EnrollmentDtos;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public interface IEnrollmentService
    {
        //Task<bool> UnenrollUserFromCourseAsync(string userId, int courseId);
        //Task<int> GetEnrollmentCountForCourseAsync(int courseId);
        public Task<Result> EnrollUserInCourseAsync(EnrollFreeCourseRequestDto request,string studentId);
        public Task<Result> EnrollUserInCourseAsync(EnrollPayedCourseRequestDto request,int paymentID);
        public Task<Result<UserCourseResponseDto>> GetEnrolledUserCourseAsync(string userId, int courseId);
        public Task<Result<IEnumerable<UserCourseResponseDto>>> GetEnrolledUserCoursesAsync(string studentId);
        public Task<Result<IEnumerable<CourseUsersResponseDto>>> GetEnrolledStudentsByCourseIdAsync(int courseId);
        public  Task<Result<bool>> CheckIfUserEnrolled(int courseId,string studId);



    }
}
