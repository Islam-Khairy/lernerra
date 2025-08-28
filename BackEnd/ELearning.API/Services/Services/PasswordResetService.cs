using ELearning.API.Data;
using ELearning.API.DTOS.AuthDtos;
using ELearning.API.Entites;
using ELearning.API.Exceptions;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net;


namespace ELearning.API.Services.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IEmailSender _emailSender;

        public PasswordResetService(UserManager<User> userManager,AppDbContext context,IEmailSender emailSender)
        {
            _userManager=userManager;
            _context=context;
            _emailSender = emailSender;
        }

        public async Task<ResetPasswordResponse> RequestResetPasswordAsync(RequestForgetPasswordDto dto)
        {
            var user= await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new BadRequestException("Email does not exist");
            }

         var token=   await _userManager.GeneratePasswordResetTokenAsync(user);
            if(string.IsNullOrEmpty(token))
            {
                throw new BadRequestException("An error occurred while creating the reset token.");
            }

            var encodedToken = WebUtility.UrlEncode(token);
            var callbackUrl = $"https://lernerra-platform.vercel.app/reset-password?email={user.Email}&token={encodedToken}"; 
            var emailDto = new EmailDto
            {
                To = user.Email,
                Subject = "Password Reset Request",
                Body = $"Please reset your password by clicking here: <a href='{callbackUrl}'>Reset Password</a>"
            };
            await _emailSender.SendEmailAsync(user.Email, "Password Reset Request",$"Please reset your password by clicking here: <a href='{callbackUrl}'>Reset Password</a>");
            return new ResetPasswordResponse
            {
                Email = user.Email,
                Token = token,
            };


        }

        public async Task ResetPasswordAsync(ResetPasswordDto dto)
        {
            var user =await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new BadRequestException("Something Went wrong");
            }
            var resetResult = await _userManager.ResetPasswordAsync(user,dto.Token,dto.Password);

            if (!resetResult.Succeeded)
            {
                var errors = string.Join(", ", resetResult.Errors.Select(e => e.Description));
                throw new BadRequestException($"Password reset failed: {errors}");
            }
           
        }
    }
}
