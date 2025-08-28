using AutoMapper;
using ELearning.API.DTOS.AuthDtos;
using ELearning.API.DTOS.CourseProgressDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class CourseProgressProfile : Profile
    {
        public CourseProgressProfile()
        {
            CreateMap<MarkLessonCompletedDto, LessonProgress>()
                .ForMember(dest => dest.CompletedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => true));

        }
    
    }
}
