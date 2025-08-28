using AutoMapper;
using ELearning.API.DTOS.UserDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResponseDto>();
        }
    }
}
