using ELearning.API.DTOS.AuthDtos;
using ELearning.API.DTOS.UserDtos;
using ELearning.API.Entites;
using FluentResults;
using System.Linq.Expressions;
using ELearning.API.DTOS.UserDto;
using System.Security.Claims;

namespace ELearning.API.Services.IServices
{
    public interface IUserService
    {
        Task<Result<string>> RegisterAsync(RegisterDto dto);
        Task<Result> ConfirmEmailAsync(ConfirmEmailDto confirmEmailDto);
        Task<AuthResponseDto> Login(LoginDto login);

        Task<Result<IEnumerable<UserResponseDto>>> GetAllUsersAsync();

        Task<Result<IEnumerable<UserResponseDto>>> GetUsersAsync(string role);

        Task<Result<UserResponseDto>> GetUserById(string id);
        //crud operations
        Task UpdateAsync(UpdateUserDto dto);
        Task<string> AddAdmin(AddAdminDto dto);

    }
}
