using AutoMapper;
using ELearning.API.DTOS.EnrollmentDtos;
using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;

namespace ELearning.API.Services.Services
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly IGenericRepository<Enrollment> _enrollmentRepository;
        private readonly IGenericRepository<Course> _courseRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IMapper _mapper;
        public EnrollmentService(IGenericRepository<Enrollment> enrollmentRepository, IGenericRepository<Course> courseRepository, IGenericRepository<User> userRepository, IMapper mapper)
        {
            _enrollmentRepository = enrollmentRepository;
            _courseRepository = courseRepository;
            _userRepository = userRepository;
            _mapper = mapper;

        }

        public async Task<Result<bool>> CheckIfUserEnrolled(int courseId,string studId)
        {
            //throw new NotImplementedException()
            var existingEnrollment = await _enrollmentRepository.GetFirstOrDefaultAsync(c => c.Course_Id == courseId && c.Student_Id == studId);
            if (existingEnrollment == null)
            {
                return Result.Fail("course not enrolled for this student");
            }
            return Result.Ok(true);

        }

        public async Task<Result> EnrollUserInCourseAsync(EnrollFreeCourseRequestDto request,string studentId)
        {
            var course = await _courseRepository.GetFirstOrDefaultAsync(c => c.Id == request.courseId);
            if (course == null)
            {
                return Result.Fail("Course not found.");
            }

            if (course.Price > 0)
            {
                return Result.Fail("Course is not free, payment required.");
            }
            var student = await _userRepository.GetFirstOrDefaultAsync(u => u.Id == studentId);
            if (student == null)
            {
                return Result.Fail("Student not found.");
            }

            var enrollment = _mapper.Map<Enrollment>(request);
            enrollment.Student_Id=studentId; // Ensure the student ID is set correctly
            enrollment.EnrollAt = DateTime.UtcNow;
            enrollment.Progress = 0;
           
            var existingEnrollment= await _enrollmentRepository.GetFirstOrDefaultAsync(c=>c.Course_Id == request.courseId && c.Student_Id == studentId);
            if(existingEnrollment!=null)
            {
                return Result.Fail("User is already enrolled in this course.");
            }
            _enrollmentRepository.CreateAsync(enrollment);
            await _enrollmentRepository.SaveChangesAsync();


            return Result.Ok();


        }
        public async Task<Result> EnrollUserInCourseAsync(EnrollPayedCourseRequestDto request,int paymentId)
        {
            var course = await _courseRepository.GetFirstOrDefaultAsync(c => c.Id == request.courseId);
            if (course == null)
            {
                return Result.Fail("Course not found.");
            }
            var student = await _userRepository.GetFirstOrDefaultAsync(u => u.Id == request.studentId);

            if (student == null)
            {
                return Result.Fail("Student not found.");
            }

            var enrollment = _mapper.Map<Enrollment>(request);

            enrollment.EnrollAt = DateTime.UtcNow;
            enrollment.Progress = 0;
            enrollment.Payment_Id = paymentId;

            var existingEnrollment = await _enrollmentRepository.GetFirstOrDefaultAsync(c => c.Course_Id == request.courseId && c.Student_Id == request.studentId);
            if (existingEnrollment != null)
            {
                return Result.Fail("User is already enrolled in this course.");
            }
            _enrollmentRepository.CreateAsync(enrollment);
            await _enrollmentRepository.SaveChangesAsync();


            return Result.Ok();


        }


        public async Task<Result<IEnumerable<CourseUsersResponseDto>>> GetEnrolledStudentsByCourseIdAsync(int courseId)
        {
          
                var course = await _courseRepository.GetFirstOrDefaultAsync(c => c.Id == courseId);
                if (course == null)
                {
                    return Result.Fail<IEnumerable<CourseUsersResponseDto>>("Course not found.");
                }
                var enrollments = await _enrollmentRepository.GetAllAsync(e => e.Course_Id == courseId, includes: new[] { "Students" });
                if (enrollments == null || !enrollments.Any())
                {
                    return Result.Fail<IEnumerable<CourseUsersResponseDto>>("No students enrolled in this course.");
                }
                var response = _mapper.Map<IEnumerable<CourseUsersResponseDto>>(enrollments);

                return Result.Ok(response);
         
        }

        public async Task<Result<UserCourseResponseDto>> GetEnrolledUserCourseAsync(string userId, int courseId)
        {
            var course = await _courseRepository.GetFirstOrDefaultAsync(c => c.Id == courseId);
            if (course == null)
            {
                return Result.Fail("Course not found.");
            }
            var student = await _userRepository.GetFirstOrDefaultAsync(u => u.Id == userId);
            if (student == null)
            {
                return Result.Fail("Student not found.");
            }
            var UserCourse =await  _enrollmentRepository.GetFirstOrDefaultAsync(e =>e.Student_Id==userId && e.Courses.Id==courseId, includes: new[] { "Courses.Lessons", "Courses.Instructor" });

            var response = _mapper.Map<UserCourseResponseDto>(UserCourse);
            return Result.Ok(response);
        }

        public async Task<Result<IEnumerable<UserCourseResponseDto>>> GetEnrolledUserCoursesAsync(string studentId)
        {

            var student = await _userRepository.GetFirstOrDefaultAsync(u => u.Id == studentId);
            if (student == null)
            {
                return Result.Fail("Student not found.");
            }

            var Courses = await _enrollmentRepository.GetAllAsync(e => e.Student_Id == studentId, includes: new[] { "Courses.Lessons", "Courses.Instructor" });


            if (Courses == null || !Courses.Any())
            {
                return Result.Fail("No courses found for this student.");
            }

            //var UserCourse = _enrollmentRepository.GetAllAsync(u=>u.Student_Id==userId, includes: new[] { "Courses" });
            var response = _mapper.Map<IEnumerable<UserCourseResponseDto>>(Courses);

            return Result.Ok(response);
        }

    }
}
