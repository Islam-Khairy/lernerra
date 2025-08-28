using AutoMapper;
using ELearning.API.Constants;
using ELearning.API.DTOS.InstructorApplicationDtos;
using ELearning.API.Entites;
using ELearning.API.Exceptions;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net;



namespace ELearning.API.Services.Services
{
    public class InstructorApplicationService : IInstructorApplicationService
    {
        private readonly IGenericRepository<InstructorApplication> _instructorApplicationRepo;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public InstructorApplicationService(IGenericRepository<InstructorApplication> instructorApplicationRepo
            , IEmailSender emailSender,UserManager<User> userManager,IMapper mapper, IWebHostEnvironment webHost)
        {
            _instructorApplicationRepo = instructorApplicationRepo;
            _emailSender = emailSender;
            _userManager = userManager;
            _mapper = mapper;
            _env = webHost;
        }

       public async Task<ReviewResponseDto> ApproveOrRejectApplicationAsync(ReviewDto dto)
{
    if (dto == null)
    {
        throw new BadRequestException("Invalid application review data.");
    } 
   
    var application = await _instructorApplicationRepo.GetByIdAsync(dto.ApplicationId);
    if (application == null)
        throw new NotFoundException("Instructor application cannot be found");


    var admin= await _userManager.FindByEmailAsync(dto.ReviewerAdminEmail);
    if(admin == null)
        throw new BadRequestException("Reviewer admin not found.");

    var isAdmin= await _userManager.IsInRoleAsync(admin,"Admin");
    if(!isAdmin)
        throw new BadRequestException("Reviewer  must be an admin.");
    
    if (!dto.IsApproved)
    {
        // change state of the application to rejected
        application.Status = ApplicationStatus.Rejected;
        application.ReviewedBy = dto.ReviewerAdminEmail;
        application.ReviewedAt = DateTime.UtcNow;
        application.Notes = dto.Notes;
        if (application.Notes == null) {

            application.Notes = "not meeting the minimum requirements";

           }
        //sending email to the user declaring the rejection
        await _emailSender.SendEmailAsync(application.Email, "Instructor Application Rejected",
              $"Dear {application.FullName},\n\nYour application for the instructor position has been rejected. \n\nReason: {dto.Notes}\n\nThank you for your interest in joining our team.\n\nBest regards,\nThe ITI Team 2 Support");

        //deleting the rejected application
        _instructorApplicationRepo.DeleteAsync(application);
        await _instructorApplicationRepo.SaveChangesAsync();

        return new ReviewResponseDto { Review = false };
    }
    else
    {
        // change state of the application to approved
        application.Status = ApplicationStatus.Approved; 
        application.ReviewedAt = DateTime.UtcNow;
        application.Notes = dto.Notes;
        _instructorApplicationRepo.UpdateAsync(application);
      
        // checking if user exist in our database with this the account
        //in the application
        var existingUser = await _userManager.FindByEmailAsync(application.Email);
        if(existingUser!=null)
            throw new BadRequestException("An account with this email already exists");
        
        //creating a new account for the instructor with 
        //a default password
        var instructor = new User
        {
<<<<<<< HEAD
            if (dto == null)
            {
                throw new BadRequestException("Invalid application review data.");
            } 
           
            var application = await _instructorApplicationRepo.GetByIdAsync(dto.ApplicationId);
            if (application == null)
                throw new NotFoundException("Instructor application cannot be found");


            var admin= await _userManager.FindByEmailAsync(dto.ReviewerAdminEmail);
            if(admin == null)
                throw new BadRequestException("Reviewer admin not found.");

            var isAdmin= await _userManager.IsInRoleAsync(admin,"Admin");
            if(!isAdmin)
                throw new BadRequestException("Reviewer  must be an admin.");
            
            if (!dto.IsApproved)
            {
                // change state of the application to rejected
                application.Status = ApplicationStatus.Rejected;
                application.ReviewedBy = dto.ReviewerAdminEmail;
                application.ReviewedAt = DateTime.UtcNow;
                application.Notes = dto.Notes;
                if (application.Notes == null) {

                    application.Notes = "not meeting the minimum requirements";

                   }
                //sending email to the user declaring the rejection
                await _emailSender.SendEmailAsync(application.Email, "Instructor Application Rejected",
                      $"Dear {application.FullName},\n\nYour application for the instructor position has been rejected. \n\nReason: {dto.Notes}\n\nThank you for your interest in joining our team.\n\nBest regards,\nThe ITI Team 2 Support");

                //deleting the rejected application
                _instructorApplicationRepo.DeleteAsync(application);
                await _instructorApplicationRepo.SaveChangesAsync();

                return new ReviewResponseDto { Review = false };
            }
            else
            {
                // change state of the application to approved
                application.Status = ApplicationStatus.Approved; 
                application.ReviewedAt = DateTime.UtcNow;
                application.Notes = dto.Notes;
                _instructorApplicationRepo.UpdateAsync(application);
              
                // checking if user exist in our database with this the account
                //in the application
                var existingUser = await _userManager.FindByEmailAsync(application.Email);
                if(existingUser!=null)
                    throw new BadRequestException("An account with this email already exists");
                
                //creating a new account for the instructor with 
                //a default password
                var instructor = new User
                {
                    UserName = application.Email,
                    Email = application.Email,
                    FullName = application.FullName,
                    PhoneNumber = application.Phone,
                    EmailConfirmed = true,
                    ImageUrl = "https://res.cloudinary.com/dnade0nhi/image/upload/v1754849990/DefaultImage_bixccf.jpg"
                };
                var defaultPassword = "A"+ Guid.NewGuid().ToString();
               
                var result = await _userManager.CreateAsync(instructor, defaultPassword);
                if (!result.Succeeded)
                {
                  var errors= string.Join(",", result.Errors.Select(e => e.Description));
                    throw new BadRequestException($"Failed to create instructor account due to {errors}");
                }

                
                var token = await _userManager.GeneratePasswordResetTokenAsync(instructor);
                
                var encodedToken = WebUtility.UrlEncode(token);
                
                var resetLink = $"http://localhost:4200/reset-password?email={instructor.Email}&token={encodedToken}";

                //sending email to the user with reset password link
                await _emailSender.SendEmailAsync(application.Email, "Instructor Application Approved",
                     $"Dear {application.FullName},\n\n" +
                     $"Congratulations! Your application to become an instructor on our platform has been approved.\n\n" +
                     $"We’re excited to have you on board and look forward to seeing the amazing content you'll create.\n\n" +
                     $"To get started, please set your password using the link below:\n\n" +
                     $"<a href='{resetLink}'>Reset Password</a>\n\n" +
                     $"Once your password is set, you can log in to your instructor dashboard and begin using your account.\n\n" +
                     $"Welcome to the team!\n\n" +
                     $"Best regards,\n" +
                     $"The ITI Team 2 Support");

                var roleResult = await _userManager.AddToRoleAsync(instructor, RolesEnum.Instructor.ToString());
                if (!roleResult.Succeeded)
                {
                    throw new BadRequestException("Failed to assign instructor role to the user.");
                }
            }
          
            await _instructorApplicationRepo.SaveChangesAsync();
            var user = await _userManager.FindByEmailAsync(application.Email);
            application.UserId = user?.Id;
            await _instructorApplicationRepo.SaveChangesAsync();

            return new ReviewResponseDto { Review = true };
=======
            UserName = application.Email,
            Email = application.Email,
            FullName = application.FullName,
            PhoneNumber = application.Phone,
            EmailConfirmed = true,
            ImageUrl = "https://res.cloudinary.com/dnade0nhi/image/upload/v1754849990/DefaultImage_bixccf.jpg"
        };
        var defaultPassword = "A"+ Guid.NewGuid().ToString();
       
        var result = await _userManager.CreateAsync(instructor, defaultPassword);
        if (!result.Succeeded)
        {
          var errors= string.Join(",", result.Errors.Select(e => e.Description));
            throw new BadRequestException($"Failed to create instructor account due to {errors}");
>>>>>>> 8601f0f7e34d6f2bb7fcbafda2a47356e502591e
        }

        
        var token = await _userManager.GeneratePasswordResetTokenAsync(instructor);
        
        var encodedToken = WebUtility.UrlEncode(token);
        
        var resetLink = $"https://lernerra-platform.vercel.app/reset-password?email={instructor.Email}&token={encodedToken}";

        //sending email to the user with reset password link
        await _emailSender.SendEmailAsync(application.Email, "Instructor Application Approved",
             $"Dear {application.FullName},\n\n" +
             $"Congratulations! Your application to become an instructor on our platform has been approved.\n\n" +
             $"We’re excited to have you on board and look forward to seeing the amazing content you'll create.\n\n" +
             $"To get started, please set your password using the link below:\n\n" +
             $"<a href='{resetLink}'>Reset Password</a>\n\n" +
             $"Once your password is set, you can log in to your instructor dashboard and begin using your account.\n\n" +
             $"Welcome to the team!\n\n" +
             $"Best regards,\n" +
             $"The ITI Team 2 Support");

        var roleResult = await _userManager.AddToRoleAsync(instructor, RolesEnum.Instructor.ToString());
        if (!roleResult.Succeeded)
        {
            throw new BadRequestException("Failed to assign instructor role to the user.");
        }
    }
  
    await _instructorApplicationRepo.SaveChangesAsync();
    var user = await _userManager.FindByEmailAsync(application.Email);
    application.UserId = user?.Id;
    await _instructorApplicationRepo.SaveChangesAsync();

    return new ReviewResponseDto { Review = true };
}

        public async Task DeleteApplicationAsync(int id)
        {
            var instructorApplication = await _instructorApplicationRepo.GetByIdAsync(id);
            if (instructorApplication == null)
                throw new NotFoundException("Instructor application cannot be found");
            
            _instructorApplicationRepo.DeleteAsync(instructorApplication);
            await _instructorApplicationRepo.SaveChangesAsync();
        }

        public async Task<IEnumerable<InstructorApplicationResponseDto>> GetAllApplicationsAsync()
        {
           var applications= await _instructorApplicationRepo.GetAllAsync();
            if(applications == null)
                throw new NotFoundException("No instructor applications found.");

            var responseDto = _mapper.Map<IEnumerable<InstructorApplicationResponseDto>>(applications);
            return responseDto;
        }

        public async Task<InstructorApplicationResponseDto> GetApplicationByIdAsync(int id)
        {
            var application = await _instructorApplicationRepo.GetByIdAsync(id);
            if (application == null)
                throw new NotFoundException(" no application found.");
            var responseDto = _mapper.Map<InstructorApplicationResponseDto>(application);
            return responseDto;
        }

        public async Task<Result<InstructorApplicationResponseDto>> CreateAsync(InstructorApplicationRequestDto instructorApplicationRequestDto)
        {
            
            if (instructorApplicationRequestDto == null)
            {
                throw new ArgumentNullException(nameof(instructorApplicationRequestDto), "Instructor application request cannot be null.");
            }
            var instructorEmail= await _userManager.FindByEmailAsync(instructorApplicationRequestDto.Email);
            if(instructorEmail != null)
            {
                throw new BadRequestException($"{instructorApplicationRequestDto.Email} this Email is already exist");
            }

            var instructorApplication = _mapper.Map<InstructorApplication>(instructorApplicationRequestDto);
            instructorApplication.Status = Constants.ApplicationStatus.Pending;

            _instructorApplicationRepo.CreateAsync(instructorApplication);
            await _instructorApplicationRepo.SaveChangesAsync();

            if (instructorApplication.User == null)
            {
                Console.WriteLine("User is null");
            }

            var responseDto = _mapper.Map<InstructorApplicationResponseDto>(instructorApplication);

            return Result.Ok(responseDto); 
        }

        public async Task<string> UplodadCv(IFormFile cv)
        {
            if (cv == null || cv.Length == 0)
            throw new BadRequestException("invalid cv format");
            //safely builds a full path like:  C:\MyApp\wwwroot\uploads where uplodas is a sub folder in wwwroot
            var uploadsFile = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFile)) Directory.CreateDirectory(uploadsFile);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(cv.FileName);
            var filePath=Path.Combine(uploadsFile,uniqueFileName);

            using (var stream= new FileStream(filePath, FileMode.Create))
            {
                await cv.CopyToAsync(stream);
            }

            var url = $"/uploads/{uniqueFileName}";
            
            return url
            ;
        }
    }
}
