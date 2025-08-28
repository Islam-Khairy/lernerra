using ELearning.API.DTOS.InstructorApplicationDtos;
using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class InstructorApplicationController : ControllerBase
    {

        private readonly IInstructorApplicationService _instructorApplicationService;

        public InstructorApplicationController(IInstructorApplicationService instructorApplicationService)
        {
            _instructorApplicationService = instructorApplicationService;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorApplicationResponseDto>> GetInstructorApplicationById(int id)
        {
            var application= await _instructorApplicationService.GetApplicationByIdAsync(id);
            return application;
                
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstructorApplicationResponseDto>>> GetAllInstructorApplications()
        {
            var applications = await _instructorApplicationService.GetAllApplicationsAsync();
            return Ok(applications);

        }

        //[Authorize(Roles = "Admin")]
        [HttpPut("Review")]
        public async Task<IActionResult> ReviewApplication(ReviewDto dto)
        {

           var result= await _instructorApplicationService.ApproveOrRejectApplicationAsync(dto);
            return Ok(result);
        }
        


        [AllowAnonymous]
        [HttpPost("apply")]
        public async Task<IActionResult> Create( InstructorApplicationRequestDto instructorApplicationRequestDto)
        {
            var result = await _instructorApplicationService.CreateAsync(instructorApplicationRequestDto);
            if (!result.IsSuccess)
                return BadRequest(result.Errors);
            return Ok(result.Value);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCv(IFormFile cv)
        {
          string cvUrl= await  _instructorApplicationService.UplodadCv(cv);
            return Ok(new {cvUrl});
        }

    }
}
