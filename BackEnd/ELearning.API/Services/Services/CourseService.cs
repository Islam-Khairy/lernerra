using AutoMapper;
using ELearning.API.Constants;
using ELearning.API.Data;
using ELearning.API.DTOS.CourseDtos;
using ELearning.API.DTOS.InstructorApplicationDtos;
using ELearning.API.Entites;
using ELearning.API.Exceptions;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.ChatBot.IServices;
using ELearning.API.Services.IServices;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ELearning.API.Services.Services
{
    public class CourseService : ICourseService
    {
        private readonly IGenericRepository<Category> _categoryRepository;
        private readonly IGenericRepository<Course> _courseRepository;
        private readonly IGenericRepository<CourseRating> _ratingRepository;
        private readonly IGenericRepository<Enrollment> _enrollmentRepository;
        private readonly IEmbeddingUpdater _embeddingUpdater;
        private readonly IRagService _ragService;
        private readonly IMapper _mapper;

        public CourseService(IGenericRepository<Category> categoryRepository, IGenericRepository<Course> courseRepository, IMapper mapper, IGenericRepository<CourseRating> ratingRepository, IGenericRepository<Enrollment> enrollmentRepository, IEmbeddingUpdater embeddingUpdater, IRagService ragService)
        {
            _categoryRepository = categoryRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
            _ratingRepository = ratingRepository;
            _enrollmentRepository = enrollmentRepository;
            _embeddingUpdater = embeddingUpdater;
            _ragService = ragService;
        }
        public async Task<Result> UploadCourseAsync(CourseUploadRequestDto dto)
        {
            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            if (category == null)
                return Result.Fail("Category not found");

            var course = _mapper.Map<Course>(dto);
            course.InstructorId = dto.InstructorId;
            course.Rate = 0;

            _courseRepository.CreateAsync(course);
            await _courseRepository.SaveChangesAsync();

            await _embeddingUpdater.UpdateMissingEmbeddingsAsync();
            await _ragService.InitializeEmbeddingsAsync();
            return Result.Ok().WithSuccess("Course created successfully");
        }
        public async Task<Result<IEnumerable<CourseResponseDto>>> GetAllCoursesAsync(bool onlyApproved = false)
        {
            IEnumerable<Course> courses;

            if (onlyApproved)
            {
                courses = await _courseRepository.GetAllAsync(
                    c => c.Status == CourseStatus.Approved,
                    includes: new[] { "Category", "Instructor" });
            }
            else
            {
                courses = await _courseRepository.GetAllAsync(
                    includes: new[] { "Category", "Instructor" });
            }

            if (!courses.Any())
            {
                return Result.Fail("No courses found");
            }

            var coursesDto = _mapper.Map<IEnumerable<CourseResponseDto>>(courses);
            return Result.Ok(coursesDto);
        }

<<<<<<< HEAD
        public async Task<Result<IEnumerable<CourseResponseDto>>> GetAllCoursesByStatus(CourseStatus courseStatus)
        {
            if (courseStatus == CourseStatus.Approved || courseStatus == CourseStatus.Rejected || courseStatus == CourseStatus.Pending) {
                var courses = await _courseRepository.GetAllAsync(
                    c=>c.Status== courseStatus, includes: new[] { "Category", "Instructor" }
                    );
                var coursesDto=_mapper.Map<IEnumerable<CourseResponseDto>>(courses);
                return Result.Ok(coursesDto);
            }
            else
            {
                throw new BadRequestException("Invalid course status");
            }
        }
=======
       public async Task<Result<IEnumerable<CourseResponseDto>>> GetAllCoursesByStatus(CourseStatus courseStatus)
{
    if (courseStatus == CourseStatus.Approved || courseStatus == CourseStatus.Rejected || courseStatus == CourseStatus.Pending) {
        var courses = await _courseRepository.GetAllAsync(
            c=>c.Status== courseStatus, includes: new[] { "Category", "Instructor" }
            );
        var coursesDto=_mapper.Map<IEnumerable<CourseResponseDto>>(courses);
        return Result.Ok(coursesDto);
    }
    else
    {
        throw new BadRequestException("Invalid course status");
    }
}
>>>>>>> 8601f0f7e34d6f2bb7fcbafda2a47356e502591e
        public async Task<Result<IEnumerable<CourseResponseDto>>> GetStudentCoursesAsync(string studentId)
        {
            var courses = await _courseRepository.GetAllAsync(
                c => c.Enrollments.Any(e => e.Student_Id == studentId),
                    includes: new[] { "Category", "Instructor","Lessons" });

            if (!courses.Any())
            {
                return Result.Fail("No courses found for this student");
            }

            var coursesDto = _mapper.Map<IEnumerable<CourseResponseDto>>(courses);
            return Result.Ok(coursesDto);
        }
        public async Task<Result<IEnumerable<CourseResponseDto>>> GetInstructorCoursesAsync(string instructorId)
        {
            var courses = await _courseRepository.GetAllAsync(
                c => c.InstructorId == instructorId,
                includes: new[] { "Category", "Lessons", "Instructor", "Enrollments", "Instructor.InstructorApplication" });

            if (!courses.Any())
            {
                return Result.Fail("No courses found for this instructor");
            }

            var coursesDto = _mapper.Map<IEnumerable<CourseResponseDto>>(courses);
            return Result.Ok(coursesDto);
        }
        public async Task<Result<CourseResponseDto>> GetCourseByID(int courseID)
        {
            var course = await _courseRepository.GetFirstOrDefaultAsync(
                c => c.Id == courseID,
                includes: new[] { "Category", "Instructor", "Enrollments", "Lessons", "Instructor.InstructorApplication" });

            if (course == null)
            {
                return Result.Fail("Course not found");
            }
                
            var courseDto = _mapper.Map<CourseResponseDto>(course);

                return Result.Ok(courseDto);
        }
        public async Task<Result> UpdateCourseAsync(int courseId, CourseUploadRequestDto updatedCourseDto, string instructorId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);
            if (course == null)
            {
                return Result.Fail("Course not found");
            }

            if (course.InstructorId != instructorId)
            {
                return Result.Fail("You are not authorized to edit this course");
            }

            _mapper.Map(updatedCourseDto, course);
            _courseRepository.UpdateAsync(course);
            await _courseRepository.SaveChangesAsync();
            return Result.Ok().WithSuccess("Course updated successfully");
        }
        public async Task<Result> UpdateCourseStatusAsync(CourseStatusDto dto)
        {
            var course = await _courseRepository.GetByIdAsync(dto.CourseId);
            if (course == null)
                return Result.Fail("Course not found");

            course.Status = dto.Status;
            course.Notes = dto.Notes;
            _courseRepository.UpdateAsync(course);
            await _courseRepository.SaveChangesAsync();

            return Result.Ok();
        }
        public async Task<Result> DeleteCourseAsync(int courseId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);
            if (course == null)
                return Result.Fail("Course not found");

            _courseRepository.DeleteAsync(course);
            await _courseRepository.SaveChangesAsync();

            return Result.Ok();
        }

        public async Task<Result> AddRatingAsync(int courseId, string studentId, int rating)
        {
            var course = await _courseRepository.GetFirstOrDefaultAsync(
                c => c.Id == courseId,
                "Enrollments","Ratings");

            if (course == null)
                return Result.Fail("Course not found");

            //var enrollments = await _enrollmentRepository.GetAllAsync(e => e.Course_Id == courseId && e.Student_Id == studentId && e.Progress == 100);

            //if (!enrollments.Any())
            //    return Result.Fail("You must complete the course to Rate it");

            var existingRating = await _ratingRepository.GetFirstOrDefaultAsync(
                r => r.CourseId == courseId && r.StudentId == studentId
            );

            if (existingRating != null)
                throw new Exception("You have already rated this course");

            var newRating = new CourseRating
            {
                CourseId = courseId,
                StudentId = studentId,
                Rating = rating
            };

            _ratingRepository.CreateAsync(newRating);

            
            var allRatings = course.Ratings?.Select(r => r.Rating).ToList() ?? new List<int>();
            allRatings.Add(rating);
            course.Rate = (float)allRatings.Average();

            _courseRepository.UpdateAsync(course);

            await _ratingRepository.SaveChangesAsync();
            return Result.Ok().WithSuccess("Rating added successfully");

        }
    }
}
