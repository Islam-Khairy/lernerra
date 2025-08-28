using AutoMapper;
using ELearning.API.DTOS.CategoryDtos;
using ELearning.API.DTOS.EnrollmentDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class EnrollmentProfile:Profile
    {

        public EnrollmentProfile()
        {
            CreateMap<Enrollment, UserCourseResponseDto>()
                .ForMember(dest => dest.courseId, opt => opt.MapFrom(src => src.Courses.Id))
                .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Courses.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Courses.Description))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Courses.Category.Name))
                .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Courses.Instructor.FullName))
                .ForMember(dest => dest.Rate, opt => opt.MapFrom(src => src.Courses.Rate))
                .ForMember(dest => dest.Lessons, opt => opt.MapFrom(src => src.Courses.Lessons));

            CreateMap<EnrollFreeCourseRequestDto, Enrollment>()
                //.ForMember(dest => dest.Student_Id, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Course_Id, opt => opt.MapFrom(src => src.courseId));
            CreateMap<EnrollPayedCourseRequestDto, Enrollment>()
                .ForMember(dest => dest.Student_Id, opt => opt.MapFrom(src => src.studentId))
                .ForMember(dest => dest.Course_Id, opt => opt.MapFrom(src => src.courseId));

            CreateMap<Enrollment, CourseUsersResponseDto>()
                .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Students.FullName))
                .ForMember(dest => dest.StudentEmail, opt => opt.MapFrom(src => src.Students.Email))
                .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => src.Progress))
                .ForMember(dest => dest.EnrollAt, opt => opt.MapFrom(src => src.EnrollAt));

            CreateMap<Lesson, LessonDto>()
            .ForMember(dest => dest.VedioURL, opt => opt.MapFrom(src => src.VedioURL))
            .ForMember(dest => dest.uploadAt, opt => opt.MapFrom(src => src.uploadAt));
        }
    }
}
