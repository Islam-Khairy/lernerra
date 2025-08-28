using ELearning.API.DTOS.PaymentDtos;
using ELearning.API.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using FluentResults;
using ELearning.API.Helpers;
namespace ELearning.API.Services.IServices
{
    public interface IPaymentService
    {
        public Task<Result<PaymentIntenResponseDto>> ProcessPaymentAsync(CreateCoursePaymentRequestDto request,string studentId);
        public Task SendPaymentConfirmationEmail(ConfirmationPaymentDataDto data);
        

    }
}
