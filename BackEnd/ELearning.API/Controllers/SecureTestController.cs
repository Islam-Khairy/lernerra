using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SecureTestController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSecureData()
        {
           
            return Ok("This is a secure endpoint. You are authenticated!");
        }
    }
}
