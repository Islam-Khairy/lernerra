using ELearning.API.DTOS.CourseProgressDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseProgressController : ControllerBase
    {
        private readonly ICourseProgressService _courseProgressService;

        public CourseProgressController(ICourseProgressService courseProgressService)
        {
            _courseProgressService = courseProgressService;
        }

        [Authorize(Roles ="Student")]
        [HttpPost("complete")]
        public async Task<IActionResult> MarkLessonAsComplete([FromBody] MarkLessonCompletedDto dto)
        {
            await _courseProgressService.MarkLessonAsCompleted(dto);
            return Ok(new { message = "Lesson marked as completed." });
        }

        [Authorize(Roles = "Student")]
        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetCourseProgress(int courseId)
        {
            var userId = User.FindFirst("uid")?.Value;
            var result = await _courseProgressService.GetCourseProgress(userId, courseId);

            if (result.IsFailed)
                return NotFound(new { error = result.Errors[0].Message });

            return Ok(result.Value);
        }
    }
}
