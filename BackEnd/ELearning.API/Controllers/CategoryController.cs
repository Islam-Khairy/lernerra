using ELearning.API.DTOS.CategoryDtos;
using ELearning.API.Entites;
using ELearning.API.Services.IServices;
using ELearning.API.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            if (categories.IsFailed)
            {
                return NotFound(categories.Errors.First().Message);
            }
                return Ok(categories.Value);
        }

        [Authorize(Roles = "Admin,Instructor")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category.IsFailed)
            {
                return NotFound(category.Errors.First().Message);
            }
            return Ok(category.Value);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto createCategoryDto)
        {
           
            var result= await _categoryService.AddCategoryAsync(createCategoryDto);
            if (result.IsFailed)
            {
                return BadRequest(result.Errors.First().Message);
            }
            return Ok("Category Created Successfully");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CreateCategoryRequestDto updateCategoryDto)
        {
           
            var result =await _categoryService.UpdateCategoryAsync(id, updateCategoryDto);
            if (result.IsFailed)
            {
                return BadRequest(result.Errors.First().Message);
            }
            return Ok(result.Successes);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);

            if (result.IsFailed)
                return NotFound(result.Errors.FirstOrDefault()?.Message);

            return Ok("Category deleted successfully");
            
        }

      
        [HttpGet("{id}/courses")]
        public async Task<IActionResult> GetCoursesByCategory(int id)
        {
            var courses= await _categoryService.GetcoursesByCategroy(id);
            if (courses.IsFailed)
            {
                return NotFound(courses.Errors.First().Message);
            }
            else
            {
                return Ok(courses.Value);
            }

        }
    }
}
