using ELearning.API.DTOS.AuthDtos;
using ELearning.API.DTOS.UserDto.Student;
using ELearning.API.DTOS.UserDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ELearning.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;

        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            if (result.IsSuccess)
            {
                var confirmationCode = result.Value;
                return Ok(new
                {
                    message = result.Successes.FirstOrDefault()?.Message,
                    confirmationCode
                });
            }

            return BadRequest(new
            {
                errors = result.Errors.Select(e => e.Message)
            });
        }

        [AllowAnonymous]
        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string code)
        {
            var dto = new ConfirmEmailDto { UserId = userId, Code = code };
            var result = await _userService.ConfirmEmailAsync(dto);
            if (result.IsSuccess)
            {
                return Ok(new
                {
                    message = result.Successes.FirstOrDefault()?.Message
                });
            }

            return BadRequest(new
            {
                errors = result.Errors.Select(e => e.Message)
            });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var token = await _userService.Login(loginDto);
            return Ok(token);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var usersResult = await _userService.GetAllUsersAsync();
            return Ok(usersResult.Value);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("role/{role}")]
        public async Task<IActionResult> GetUsersByRole(string role)
        {
            var usersResult = await _userService.GetUsersAsync(role);
            return Ok(usersResult.Value);
        }   

        // [Authorize(Roles = "Admin,Instructor,Student")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var userResult = await _userService.GetUserById(id);

            return Ok(userResult.Value);

        }

        //[Authorize(Roles = "Student,Instructor")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(DTOS.UserDto.UpdateUserDto dto)
        {
            //var userId = User.FindFirst("uid")?.Value;
            //if (string.IsNullOrEmpty(userId))
            //    return Unauthorized();
            await _userService.UpdateAsync(dto);
            return Ok();
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("addAdmin")]
        public async Task<IActionResult> AddAdmin([FromBody]AddAdminDto dto)
        {
            var message = await _userService.AddAdmin(dto);
            return Ok(new {message=message});   
        }
    }
}
