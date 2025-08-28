using AutoMapper;
using ELearning.API.DTOS.UserDto;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class UserProifle:Profile
    {
       public UserProifle()
        {
            CreateMap<UpdateUserDto, User>();
        }
    }
}
