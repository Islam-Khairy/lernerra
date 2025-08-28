 using ELearning.API.DTOS.LessonDtos;
using ELearning.API.Services.IServices;
using ELearning.API.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LessonController : ControllerBase
{
    private readonly ILessonService _LessonService;

    public LessonController(ILessonService service)
    {
        _LessonService = service;
    }

    [Authorize(Roles ="Instructor")]
    [HttpPost]
    public async Task<IActionResult> CreateLesson(LessonRequestDto dto)
    {
        var result = await _LessonService.CreateLessonAsync(dto);
        if (result.IsFailed)
            return BadRequest(result.Errors.First().Message);

        return Ok(result.Successes.First().Message);
    }

    [AllowAnonymous]
    [HttpGet("course/{courseId}")]
    public async Task<IActionResult> GetAllLessons(int courseId)
    {
        var result = await _LessonService.GetAllLessonsByCourseIdAsync(courseId);
        if (result.IsFailed)
            return NotFound(result.Errors.First().Message);
        return Ok(result.Value);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetLessonById(int id)
    {
        var result = await _LessonService.GetLessonById(id);
        if (result.IsFailed)
            return NotFound(result.Errors.First().Message);
        return Ok(result.Value);
    }

    [Authorize(Roles = "Instructor")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLesson(int id, LessonUpdateDto dto)
    {
        var result = await _LessonService.UpdateLesson(id, dto);
        if (result.IsFailed)
            return BadRequest(result.Errors.First().Message);
        return Ok(result.Successes.First().Message);
    }

    [Authorize(Roles = "Instructor")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLesson(int id)
    {
        var result = await _LessonService.DeleteLessonAsync(id);
        if (result.IsFailed)
            return NotFound(result.Errors.First().Message);
        return Ok(result.Successes.First().Message);
    }
}
