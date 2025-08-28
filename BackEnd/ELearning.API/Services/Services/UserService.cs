using AutoMapper;
using ELearning.API.Constants;
using ELearning.API.DTOS.AuthDtos;
using ELearning.API.DTOS.UserDto;
using ELearning.API.DTOS.UserDtos;
using ELearning.API.Entites;
using ELearning.API.Exceptions;
using ELearning.API.Helpers;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;

namespace ELearning.API.Services.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ITokenService _authService;
        private readonly IGenericRepository<User> genericRepository;
        private readonly IConfiguration _config;
        


        public UserService(UserManager<User> userManager,
                           RoleManager<Role> roleManager,
                           IMapper mapper,
                           IEmailSender emailSender,
                           IHttpContextAccessor httpContext,
                           ITokenService authService,
                           IGenericRepository<User> genericRepository,
                           IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _emailSender = emailSender;
            _httpContext = httpContext;
            _authService = authService;
            this.genericRepository = genericRepository;
            _config = config;
        }

        public async Task<Result<string>> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
                return Result.Fail("User already exists with this email.");

            var user = _mapper.Map<User>(dto);
            user.UserName = dto.Email;

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return Result.Fail(string.Join(", ", result.Errors.Select(e => e.Description)));

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            await _userManager.AddToRoleAsync(user, RolesEnum.Student.ToString());

            await SendConfirmationEmail(user, code);

            return Result.Ok(code).WithSuccess("User registered successfully");
        }

        public async Task<Result> ConfirmEmailAsync(ConfirmEmailDto confirmEmailDto)
        {
            var user = await _userManager.FindByIdAsync(confirmEmailDto.UserId);
            if (user == null)
                return Result.Fail("Invalid User ID");

            if (user.EmailConfirmed)
                return Result.Fail("Email has already been confirmed.");

            string code;
            try
            {
                code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmEmailDto.Code));
            }
            catch (Exception ex)
            {
                return Result.Fail("Invalid confirmation code. " + ex.Message);
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (!result.Succeeded)
                return Result.Fail(string.Join(", ", result.Errors.Select(e => e.Description)));

            return Result.Ok().WithSuccess("Email confirmed successfully.");
        }

        public async Task<AuthResponseDto> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                throw new BadRequestException("invalid email or password");

            if (!user.EmailConfirmed)
               throw new BadRequestException("Please confirm your email before logging in.");

            var token = await _authService.GenerateAccessTokenAsync(user);
            //var defaultUrl = "https://res.cloudinary.com/dnade0nhi/image/upload/v1754577205/DefaultImage_vku94h.jpg";
            var response= new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Roles = await _userManager.GetRolesAsync(user),
                PhoneNumber = user.PhoneNumber,
                Expiration = DateTime.UtcNow.AddMinutes(60),
                PictureUrl=user.ImageUrl
            };
            //response.PictureUrl = user.ProfilePictureUrl ?? defaultUrl;
            return response;
        }

        private async Task SendConfirmationEmail(User user, string code)
        {
            var BaseUrl = "https://lernerra.runasp.net/api";

            var emailBody = EmailBodyBuilder.GenerateEmailContent("ConfirmEmail",
                new Dictionary<string, string>
                {
                    {"{{name}}", user.FullName},
                    {"{{action_url}}", $"{BaseUrl}/user/confirmEmail?userId={user.Id}&code={code}" }
                }
            );

            await _emailSender.SendEmailAsync(user.Email!, "E-Learning System Confirmation Email", emailBody);
        }


        public async Task<Result<IEnumerable<UserResponseDto>>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync(); 
            if (users == null || !users.Any() )
                throw new NotFoundException("No users found");
            var usersDto = _mapper.Map<IEnumerable<UserResponseDto>>(users);
            return Result.Ok(usersDto);
        }
        public async Task<Result<IEnumerable<UserResponseDto>>> GetUsersAsync(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
                throw new ArgumentException("Role name must be provided.", nameof(role));
            var roleUsers = await _userManager.GetUsersInRoleAsync(role);
            if (roleUsers == null || !roleUsers.Any() )
                throw new NotFoundException($"No users found in role: {role}");
            var usersDto = _mapper.Map<IEnumerable<UserResponseDto>>(roleUsers);
            return Result.Ok(usersDto);
        }
        public async Task<Result<UserResponseDto>> GetUserById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("User ID must be provided.", nameof(id));
            var user = await _userManager.Users.Include(u => u.InstructorApplication).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
                throw new NotFoundException("User not found");
            var userDto = _mapper.Map<UserResponseDto>(user);
            return Result.Ok(userDto);
        }
        public async Task UpdateAsync(UpdateUserDto dto)
        {
            //var user= await  _userManager.FindByIdAsync(userId);
            var user =await _userManager.FindByEmailAsync(dto.Email);

            if (user==null)
                throw new BadRequestException("invalid request");

            _mapper.Map(dto,user);

            var result= await  _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = string.Join(",", result.Errors.Select(e => e.Description));
                throw new BadRequestException($"Failed to update user: {errors}");

            }
        }

        public async Task<string> AddAdmin(AddAdminDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new NotFoundException("Email not found");
            }

            var studentEmail = await _userManager.IsInRoleAsync(user, "Student");
            if(studentEmail == false)
            {
                throw new BadRequestException("This email is not student email");
            }
            var removeStudent=await _userManager.RemoveFromRoleAsync(user, "Student");
            var addAdmin=await _userManager.AddToRoleAsync(user, "Admin");
            if (removeStudent == IdentityResult.Success && addAdmin == IdentityResult.Success)
            {
                return "User has been successfully added to the Admin role.";
            }
            else
            {
                var allErrors = removeStudent.Errors
           .Concat(addAdmin.Errors)
           .Select(e => e.Description);

                var errorMessage = string.Join(", ", allErrors);
                throw new Exception($"Failed to update roles: {errorMessage}");
            }

        }

       
    }
}
