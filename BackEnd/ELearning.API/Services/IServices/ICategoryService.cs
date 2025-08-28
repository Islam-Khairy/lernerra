using ELearning.API.DTOS.CategoryDtos;
using ELearning.API.DTOS.CourseDtos;
using FluentResults;
namespace ELearning.API.Services.IServices
{
    public interface ICategoryService
    {
        Task<Result> AddCategoryAsync(CreateCategoryRequestDto request);
        Task<Result> DeleteCategoryAsync(int id);
        Task<Result<IEnumerable<CategoryResponseDto>>> GetAllCategoriesAsync();
        Task<Result<CategoryResponseDto>> GetCategoryByIdAsync(int categoryId);
        Task <Result>UpdateCategoryAsync(int categoryId, CreateCategoryRequestDto updateRequest);
        Task<Result<CoursesByCategoryDto>> GetcoursesByCategroy(int categroyId);


      

    }

}
