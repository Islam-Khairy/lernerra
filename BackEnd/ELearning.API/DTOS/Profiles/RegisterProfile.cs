using AutoMapper;
using ELearning.API.DTOS.AuthDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            CreateMap(typeof(RegisterDto), typeof(User));
        }

    }
}
