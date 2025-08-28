using AutoMapper;
using ELearning.API.DTOS.LessonDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles;
public class LessonProfile:Profile
{
    public LessonProfile()
    {
        CreateMap(typeof(LessonRequestDto), typeof(Lesson));
        CreateMap(typeof(Lesson), typeof(LessonResponseDto));
        CreateMap(typeof(LessonUpdateDto), typeof(Lesson));
    }
}
