using AutoMapper;
using ELearning.API.DTOS.LessonDtos;
using ELearning.API.Entites;
using ELearning.API.Exceptions;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELearning.API.Services.Services
{
    public class LessonService : ILessonService
    {
        private readonly IGenericRepository<Lesson> _lessonRepository;
        private readonly IMapper _mapper;
        public LessonService(IGenericRepository<Lesson> genericRepository,IMapper mapper)
        {
            _lessonRepository = genericRepository;
            _mapper = mapper;
        }

        public async Task<Result> CreateLessonAsync(LessonRequestDto lessonDto)
        {
            if (lessonDto == null)
                return Result.Fail("Lesson data cannot be null");

            var lesson = _mapper.Map<Lesson>(lessonDto);
            lesson.uploadAt = DateTime.UtcNow;
            _lessonRepository.CreateAsync(lesson);
            await _lessonRepository.SaveChangesAsync();
            return Result.Ok().WithSuccess("Lesson Uploaded successfully");
        }

        public async Task<Result<List<LessonResponseDto>>> GetAllLessonsByCourseIdAsync(int courseId)
        {
            var lessons = await _lessonRepository.GetAllAsync();
            var filteredLessons = lessons.Where(l => l.CourseId == courseId).ToList();

            if (lessons == null || !lessons.Any())
                return Result.Fail("No lessons found.");

            var lessonsDto = _mapper.Map<List<LessonResponseDto>>(filteredLessons);
            return Result.Ok(lessonsDto);
        }

        public async Task<Result<LessonResponseDto>> GetLessonById(int id)
        {
            var lesson = await _lessonRepository.GetByIdAsync(id);

            if (lesson == null)
            {
                return Result.Fail("Lesson not found.");
            }
            var lessonDto = _mapper.Map<LessonResponseDto>(lesson);
            return Result.Ok(lessonDto);
        }

        public async Task<Result> UpdateLesson(int id, LessonUpdateDto lessonDto)
        {
            var lesson = await _lessonRepository.GetByIdAsync(id);

            if (lesson == null)
            {
                return Result.Fail("Lesson not found.");
            }

            _mapper.Map(lessonDto, lesson);
            _lessonRepository.UpdateAsync(lesson);
            await _lessonRepository.SaveChangesAsync();
            return Result.Ok().WithSuccess("Lesson updated successfully.");
        }

        public async Task<Result> DeleteLessonAsync(int id)
        {
            var lesson = await _lessonRepository.GetByIdAsync(id);

            if (lesson == null)
            {
                return Result.Fail("Lesson not found.");
            }

            _lessonRepository.DeleteAsync(lesson);
            await _lessonRepository.SaveChangesAsync();
            return Result.Ok().WithSuccess("Lesson deleted successfully.");
        }

    }
}
