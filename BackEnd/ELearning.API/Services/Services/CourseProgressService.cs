using AutoMapper;
using ELearning.API.Data;
using ELearning.API.DTOS.CourseProgressDtos;
using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace ELearning.API.Services.Services
{
    public class CourseProgressService : ICourseProgressService
    {
        private readonly IGenericRepository<LessonProgress> _progressRepo;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public CourseProgressService(IGenericRepository<LessonProgress> progressRepo, AppDbContext context, IMapper mapper)
        {
            _progressRepo = progressRepo;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<CourseProgressDto>> GetCourseProgress(string userId, int courseId)
        {
            var courseLessonCount = await _context.Lessons.CountAsync(l => l.CourseId == courseId);
            if (courseLessonCount == 0)
                return Result.Fail("This course has no lessons.");

            var completedLessons = await _context.LessonProgresses
                .CountAsync(p => p.UserId == userId && p.Lesson.CourseId == courseId && p.IsCompleted);

            double percentage = (completedLessons / (double)courseLessonCount) * 100;

            var progressDto = new CourseProgressDto
            {
                UserId = userId,
                CourseId = courseId,
                ProgressPercentage = Math.Round(percentage, 2)
            };

            return Result.Ok(progressDto);

        }

        public async Task MarkLessonAsCompleted(MarkLessonCompletedDto dto)
        {
            var existing = await _context.LessonProgresses
                .FirstOrDefaultAsync(lp => lp.UserId == dto.UserId && lp.LessonId == dto.LessonId);

            if (existing == null)
            {
                var progress = _mapper.Map<LessonProgress>(dto);
                _progressRepo.CreateAsync(progress);
                await _progressRepo.SaveChangesAsync();
            }
        }
    }
}
