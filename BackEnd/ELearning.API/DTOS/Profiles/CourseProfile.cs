using AutoMapper;
using ELearning.API.DTOS.CourseDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{   public class CourseProfile : Profile
    {
        public CourseProfile() {
            CreateMap<CourseUploadRequestDto, Course>()
                .ForMember(dest => dest.Rate, opt => opt.Ignore()) 
                .ForMember(dest => dest.InstructorId, opt => opt.Ignore()) 
                .ForMember(dest => dest.Instructor, opt => opt.Ignore())
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.Lessons, opt => opt.Ignore())
                .ForMember(dest => dest.Enrollments, opt => opt.Ignore())
                .ForMember(dest => dest.Currency, opt => opt.MapFrom(src =>
                string.IsNullOrEmpty(src.Currency) ? "EGP" : src.Currency)); ;

            CreateMap<Course, CourseResponseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.FullName))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString())); 
        }
    }
}
