using ELearning.API.DTOS.AuthDtos;
using Microsoft.AspNetCore.Identity.Data;

namespace ELearning.API.Services.IServices
{
    public interface IPasswordResetService
    {
        Task<ResetPasswordResponse>  RequestResetPasswordAsync( RequestForgetPasswordDto dto);
        Task ResetPasswordAsync(ResetPasswordDto dto);
    }
}
