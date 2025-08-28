using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using Stripe;
using FluentResults;
using ELearning.API.DTOS.EnrollmentDtos;
using ELearning.API.Constants;
using ELearning.API.Helpers;
using ELearning.API.DTOS.PaymentDtos;
using Microsoft.EntityFrameworkCore;
using ELearning.API.Data;

namespace ELearning.API.Services.Services
{
    public class WebhookService : IWebhookService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IEnrollmentService _enrollmentService;
        private readonly IPaymentService _paymentService;


        public WebhookService(IPaymentRepository genericRepository, IEnrollmentService enrollmentService, IPaymentService paymentService)
        {

            _paymentRepository = genericRepository;
            _enrollmentService = enrollmentService;
            _paymentService = paymentService;

        }
        private PaymentStatus MapStripeStatusToPaymentStatus(string stripeStatus)
        {
            return stripeStatus.ToLower() switch
            {
                "succeeded" => PaymentStatus.Succeeded,
                "processing" => PaymentStatus.Pending,
                "requires_payment_method" => PaymentStatus.Pending,
                "requires_action" => PaymentStatus.Pending,
                "canceled" => PaymentStatus.Cancelled,
                "failed" => PaymentStatus.Failed,
                _ => throw new ArgumentOutOfRangeException(nameof(stripeStatus), $"Unhandled status: {stripeStatus}")
            };
        }

        public async Task<Result<string>> HandlePaymentIntentSucceededAsync(PaymentIntent paymentIntent)
        {
            //check status in payment table
            var Payment = await _paymentRepository.GetFirstOrDefaultAsync(p => p.PaymentIntentId == paymentIntent.Id);
            if (Payment == null)
            {
                return Result.Fail("Payment intent not found");
            }

            var enrollmentRequest = new EnrollPayedCourseRequestDto
            {
                courseId = Payment.Course_Id, // Assuming single course enrollment
                studentId = Payment.Student_Id,

            };
            var res = await _enrollmentService.EnrollUserInCourseAsync(enrollmentRequest, Payment.ID);

            if (res.IsFailed)
            {
                return res;
            }
           
            //confirm the payment 
            var newStatus = MapStripeStatusToPaymentStatus(paymentIntent.Status);

            Payment.Status = newStatus;
            Payment.ConfirmedAt = DateTime.UtcNow;
            Payment.PaymentMethodId = paymentIntent.PaymentMethodId;


            //update payment in DB
           await _paymentRepository.UpdateAsync(Payment);
            //await _paymentRepository.SaveChangesAsync();


           
            var email = paymentIntent.Metadata["Email"];
            var course = paymentIntent.Metadata["course"];
            var user = paymentIntent.Metadata["userId"];
            var amount = paymentIntent.AmountReceived;
            var transaction_Id=paymentIntent.Id;
            var payment_date = paymentIntent.Metadata["payment_date"];
            ConfirmationPaymentDataDto data = new ConfirmationPaymentDataDto
            {
                email = email,
                courseName = course,
                userId = user,
                amount = amount,
                transaction_Id = transaction_Id,
                payment_date = payment_date
            };


           await _paymentService.SendPaymentConfirmationEmail(data);
        //assign courses for user
       

            return Result.Ok("Payment and Enrolled Succeeded");
                       
        }



        public async Task<Result<string>> HandlePaymentIntentPaymentFailedAsync(PaymentIntent paymentIntent)
        {
            var Payment = await _paymentRepository.GetFirstOrDefaultAsync(p=>p.PaymentIntentId==paymentIntent.Id);

            if (Payment == null)
            {
                return Result.Fail("Payment not found");
            }
            
            var newStatus = MapStripeStatusToPaymentStatus(paymentIntent.Status);
            Payment.Status = newStatus;
            Payment.PaymentMethodId = paymentIntent.PaymentMethodId;

             await _paymentRepository.UpdateAsync(Payment);
            //await _paymentRepository.SaveChangesAsync();

            return Result.Fail("Payment Failed");
            
        }


        public Task<Result<string>> HandlePaymentIntentCanceledAsync(PaymentIntent paymentIntentnt)
        {
            throw new NotImplementedException();
        }
    }
}
