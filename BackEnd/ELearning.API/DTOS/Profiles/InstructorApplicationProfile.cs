using AutoMapper;
using ELearning.API.DTOS.InstructorApplicationDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{

    public class InstructorApplicationProfile:Profile
    {
        public InstructorApplicationProfile()
        {
            CreateMap<InstructorApplicationRequestDto, InstructorApplication>();
            CreateMap<InstructorApplication, InstructorApplicationResponseDto>();
        }
    }
}
