using ELearning.API.DTOS.AuthDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PasswordResetController(IPasswordResetService _passwordReset) : ControllerBase
    {

        [HttpPost("request")]
        public async Task<IActionResult> ForgetPassword(RequestForgetPasswordDto dto)
        {
         var result=  await _passwordReset.RequestResetPasswordAsync(dto);
            return Ok(result);
        }


        
        [HttpPost("Reset")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
           await _passwordReset.ResetPasswordAsync(dto);
            return Ok(new { message = "Password reset successfully" });
        }
    } 
}
