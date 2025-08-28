using ELearning.API.DTOS.PaymentDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace ELearning.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _service;
        public PaymentController(IPaymentService paymentService)
        {
            _service = paymentService;

        }

        [Authorize(Roles = "Student")]
        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent(CreateCoursePaymentRequestDto request)
        {

           
            var studentId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized("Student ID not found in token");

            var response = await _service.ProcessPaymentAsync(request,studentId);

            if (response.IsFailed)
            {
                return BadRequest(response.Errors.First().Message);
            }

            return Ok(response.Value);


               
        }

        //[HttpPost("Status")]

        //public async Task<IActionResult> GetPaymentStatus(string PaymentIntentId)
        //{

        //    var paymentStatus = await _service.GetPaymentStatusAsync(PaymentIntentId);
        //    if (paymentStatus == null)
        //    {
        //        return NotFound("Payment status not found.");
               
        //    }
        //    else
        //        return Ok(new { status = paymentStatus });

        //}
    }
}
