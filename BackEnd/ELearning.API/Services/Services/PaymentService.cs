using ELearning.API.Services.IServices;
using Stripe;
using ELearning.API.DTOS.PaymentDtos;
using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using AutoMapper;
using FluentResults;
using ELearning.API.Constants;
using Microsoft.AspNetCore.Identity.UI.Services;

using ELearning.API.Helpers;
using Stripe.V2;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ELearning.API.Services.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IGenericRepository<Payment> _paymentRepository ;
        private readonly IGenericRepository<Course> _courseRepository ;
        private readonly IGenericRepository<Enrollment> _enrollmentRepository;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IUserService _userService;


        public PaymentService(IGenericRepository<Payment> paymentRepository, IGenericRepository<Course> courseRepository,IMapper mapper,IGenericRepository<Enrollment> enrollmentRepository,IUserService userService,IEmailSender emailSender)
        {
            _paymentRepository = paymentRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
            _enrollmentRepository = enrollmentRepository;
            _userService = userService;
            _emailSender = emailSender;

        }

        public async Task<Result<PaymentIntenResponseDto>> ProcessPaymentAsync(CreateCoursePaymentRequestDto request,string studentId)
        {

            var user = await _userService.GetUserById(studentId);

            var existingEnrollment = await _enrollmentRepository.GetFirstOrDefaultAsync(c => c.Course_Id == request.courseID&& c.Student_Id == studentId);
            if (existingEnrollment != null)
            {
                return Result.Fail("User is already enrolled in this course.");
            }
            
            if (request.courseID == null )
                return Result.Fail("No courses provided for payment.");

            var Course = await _courseRepository.GetFirstOrDefaultAsync(c => c.Id==request.courseID);

            if (Course == null )
                return Result.Fail("No courses provided for payment.");

           
            var totalAmount = (long)(Course.Price * 100); // Convert to cents for Stripe

            //Create Stripe PaymentIntent
            var paymentIntentService = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = totalAmount,
                Currency = "usd",
                ReceiptEmail = user.Value.Email,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
                Metadata = new Dictionary<string, string>
                {
                    { "userId", studentId },
                    { "Email", user.Value.Email},
                    { "amount", (totalAmount/100m).ToString()}, 
                    {"currency", "USD" },
                    { "course",Course.Name},
                    { "payment_date", DateTime.UtcNow.ToString("yyyy-MM-dd") } // Store the payment date
                }
            };
            var paymentIntent = await paymentIntentService.CreateAsync(options);

            var paymentdata = new PaymentDataDto
            {
                UserId = studentId,
                Amount = totalAmount / 100m, // Convert back to dollars
                Status = PaymentStatus.Pending,
                PaymentIntentId = paymentIntent.Id,
                CreatedAt = DateTime.UtcNow,
                Currency = "usd",
                //Courses = Courses.Select(c => new CoursePriceDto { CourseID = c.Id, Price = c.Price }).ToList()
                CoursesId = Course.Id,
            };

            var payment = _mapper.Map<Payment>(paymentdata); // Map the PaymentDataDto to Payment entity
             _paymentRepository.CreateAsync(payment);
            await _paymentRepository.SaveChangesAsync();


            return Result.Ok(new PaymentIntenResponseDto{ ClientSecret=paymentIntent.ClientSecret});


        }
        public async Task SendPaymentConfirmationEmail(ConfirmationPaymentDataDto data)
        {
            var user = await _userService.GetUserById(data.userId);
            var emailBody = EmailBodyBuilder.GenerateEmailContent("PaymentConfirmation",
                new Dictionary<string, string>
                {
            {"{{name}}", user.Value.FullName},
            {"{{amount}}", (data.amount/100m).ToString("F2")},
            {"{{course_name}}", data.courseName},
            {"{{transaction_id}}", data.transaction_Id},
            {"{{payment_date}}", data.payment_date},
             //{"actionURL", "http://localhost:4200/courses" },
                   
                }
            );

            await _emailSender.SendEmailAsync(
                user.Value.Email!,
                "Payment Confirmation - E-Learning System",
                emailBody
            );
        }

       
        public Task<bool> RefundPaymentAsync(string userId, decimal amount, string paymentMethod)
        {
            throw new NotImplementedException();
        }

       

    }
}
