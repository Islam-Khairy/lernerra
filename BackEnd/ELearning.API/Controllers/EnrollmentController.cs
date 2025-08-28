using ELearning.API.DTOS.EnrollmentDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly IEnrollmentService _enrollmentService;
        public EnrollmentController(IEnrollmentService enrollmentService)
        {
            _enrollmentService = enrollmentService;
        }

        [Authorize(Roles = "Student")]
        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollUserInCourseAsync([FromBody] EnrollFreeCourseRequestDto request)
        {
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized("Student ID not found in token");

            if (request == null)
            {
                return BadRequest("Invalid enrollment request.");
            }
            var result = await _enrollmentService.EnrollUserInCourseAsync(request, studentId);
            if (result.IsFailed)
            {
                return BadRequest(result.Errors.First().Message);
            }
            return Ok(new { message = "Enrollment successful." });
        }


        [Authorize(Roles = "Student")]
        [HttpGet("user/{userId}/course/{courseId}")]
        public async Task<IActionResult> GetEnrolledUserCourseAsync( int courseId)
        {
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized("Student ID not found in token");

            if (string.IsNullOrEmpty(studentId) || courseId <= 0)
            {
                return BadRequest("Invalid user ID or course ID.");
            }
            var result = await _enrollmentService.GetEnrolledUserCourseAsync(studentId, courseId);
            if (result.IsFailed)
            {
                return NotFound(result.Errors.First().Message);
            }
            return Ok(result.Value);
        }

        [Authorize(Roles = "Student")]
        [HttpGet("user/courses")]
        public async Task<IActionResult> GetEnrolledCoursesByUserIdAsync()
        {
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized("Student ID not found in token");

            if (string.IsNullOrEmpty(studentId))
            {
                return BadRequest("Invalid user ID.");
            }
            var result = await _enrollmentService.GetEnrolledUserCoursesAsync(studentId);
            if (result.IsFailed)
            {
                return NotFound(result.Errors.First().Message);
            }
            return Ok(result.Value);
        }

        [Authorize(Roles = "Admin,Instructor")]
        [HttpGet("course/{courseId}/students")]
        public async Task<IActionResult> GetEnrolledStudentsByCourseIdAsync(int courseId)
        {
            if (User.Identity.IsAuthenticated && !User.IsInRole("Admin") && !User.IsInRole("Instructor"))
            {
                return Unauthorized("You do not have permission to access this resource.");
            }
            if (courseId <= 0)
            {
                return BadRequest("Invalid course ID.");
            }
            var result = await _enrollmentService.GetEnrolledStudentsByCourseIdAsync(courseId);
            if (result.IsFailed)
            {
                return NotFound(result.Errors.First().Message);
            }
            return Ok(result.Value);
        }

        
    }
}
