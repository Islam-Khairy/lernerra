
﻿using ELearning.API.Services.IServices;
﻿using ELearning.API.DTOS.CourseDtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ELearning.API.Constants;

namespace ELearning.API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
    
        private readonly ICourseService _courseService;
        private readonly IEnrollmentService _enrollmentService;

        public CourseController(ICourseService courseService,IEnrollmentService enrollmentService)
        {
            _courseService = courseService;
            _enrollmentService = enrollmentService;

        }

        [Authorize(Roles = "Instructor")]
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadCourse([FromBody] CourseUploadRequestDto dto)
        {
            var instructorId = User.FindFirst("uid")?.Value;
            var result = await _courseService.UploadCourseAsync(dto);
            if (result.IsFailed)
            {
                return BadRequest(result.Errors.FirstOrDefault()?.Message);
            }
            return Ok(result.Successes.FirstOrDefault()?.Message);
        }

        [AllowAnonymous]
        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedCourses()
        {
            var result = await _courseService.GetAllCoursesAsync(onlyApproved: true);
            if (result.IsFailed) return NotFound(result.Errors.FirstOrDefault()?.Message);
            return Ok(result.Value);
        }

        [Authorize(Roles="Admin")]
        [HttpGet("Status")]
        public async Task<IActionResult> GetAllCoursesByStatus(CourseStatus courseStatus)
        {
            var result = await _courseService.GetAllCoursesByStatus(courseStatus);
            if (result.IsFailed) return NotFound(result.Errors.FirstOrDefault()?.Message);
            return Ok(result.Value);
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCourses()
        {
            var result = await _courseService.GetAllCoursesAsync(); // default = false
            if (result.IsFailed) return NotFound(result.Errors.FirstOrDefault()?.Message);
            return Ok(result.Value);
        }

        [Authorize(Roles ="Student")]
        [HttpGet("student")]
        public async Task<IActionResult> GetStudentCourses()
        {
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized("Student ID not found in token");

            var result = await _courseService.GetStudentCoursesAsync(studentId);
            if (result.IsFailed)
            {
                return NotFound(result.Errors.FirstOrDefault()?.Message);
            }
            return Ok(result.Value);
        }

        [Authorize(Roles = "Instructor")]
        [HttpGet("instructor")]
        public async Task<IActionResult> GetInstructorCourses()
        {
            var instructorId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(instructorId))
                return Unauthorized("Instructor ID not found in token");

            var result = await _courseService.GetInstructorCoursesAsync(instructorId);
            if (result.IsFailed)
                return NotFound(result.Errors.First().Message);

            return Ok(result.Value);
        }
        [AllowAnonymous]
        [HttpGet("instructor/{instructorId}")]
        public async Task<IActionResult> GetInstructorCoursesById(string instructorId)
        {

            var result = await _courseService.GetInstructorCoursesAsync(instructorId);
            if (result.IsFailed)
                return NotFound(result.Errors.First().Message);

            return Ok(result.Value);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var result = await _courseService.GetCourseByID(id);

            if (result.IsFailed)
            {
                return NotFound(result.Errors.FirstOrDefault()?.Message);
            }

            bool isEnrolled = false;
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirst("uid")?.Value; 
                var res = await _enrollmentService.CheckIfUserEnrolled(id, userId);
                if(res.IsSuccess)
                {
                    isEnrolled = res.Value;
                }
                
            }
            
            return Ok(new { data=result.Value,IsEnrolled=isEnrolled });
        }

        [Authorize(Roles = "Instructor")]
        [HttpPut("{courseId}")]
        public async Task<IActionResult> EditCourseAsync(int courseId, [FromBody] CourseUploadRequestDto updatedCourseDto)
        {
            var instructorId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(instructorId))
                return Unauthorized("Instructor ID not found in token");

            var result = await _courseService.UpdateCourseAsync(courseId, updatedCourseDto, instructorId);
            if (result.IsFailed)
            {
                return BadRequest(result.Errors.FirstOrDefault()?.Message);
            }
            return Ok(result.Successes.FirstOrDefault()?.Message);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("status")]
        public async Task<IActionResult> UpdateCourseStatus([FromBody] CourseStatusDto dto)
        {
            var result = await _courseService.UpdateCourseStatusAsync(dto);

            if (result.IsFailed)
                return NotFound(result.Errors.FirstOrDefault()?.Message);

            return Ok("Course status updated successfully");
        }

        [Authorize(Roles = "Admin,Instructor")]
        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            var result = await _courseService.DeleteCourseAsync(courseId);

            if (result.IsFailed)
                return NotFound(result.Errors.FirstOrDefault()?.Message);

            return Ok("Course deleted successfully");
        }

        [HttpPost("rate")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> AddRating([FromBody] AddRatingRequestDto dto)
        {
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized();

            var result = await _courseService.AddRatingAsync(dto.CourseId, studentId, dto.Rating);

            if (result.IsFailed)
                return BadRequest(result.Errors.First().Message);

            return Ok(result.Successes.First().Message);
        }


    }
}
