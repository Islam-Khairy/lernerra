using AutoMapper;
using Azure.Messaging;
using ELearning.API.Constants;
using ELearning.API.DTOS.CategoryDtos;
using ELearning.API.DTOS.CourseDtos;
using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using ELearning.API.Services.IServices;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using Stripe;

namespace ELearning.API.Services.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IGenericRepository<Category> _CategoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(IGenericRepository<Category> CategooryRepository,IMapper mapper)
        {
            _CategoryRepository = CategooryRepository;
            _mapper = mapper;

        }

        //private readonly IUnitOfWork _unitOfWork;
        //public CategoryService(IUnitOfWork unitOfWork)
        //{
        //    _unitOfWork = unitOfWork;
        //}
        // Implement methods for category service here
        public async Task<Result> AddCategoryAsync(CreateCategoryRequestDto request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Name))
            {
                return Result.Fail("Category name cannot be null or empty.");
            }

            var category = _mapper.Map<Category>(request);

             _CategoryRepository.CreateAsync(category);   
            await _CategoryRepository.SaveChangesAsync();

            return Result.Ok();
        }


        public Task<string> DeleteCategoryAsync(string categoryName)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<CategoryResponseDto>>> GetAllCategoriesAsync()
        {
            //throw new NotImplementedException();
            var categories= await  _CategoryRepository.GetAllAsync();
            if (categories == null)
            {
                return Result.Fail("No categories found.");
            }

            var categoryDtos = _mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
            return Result.Ok(categoryDtos);
            
           

        }

       
        public async Task<Result> UpdateCategoryAsync(int categoryId,CreateCategoryRequestDto updateRequest)
        {
            //throw new NotImplementedException();
            if (updateRequest == null || string.IsNullOrEmpty(updateRequest.Name))
            {
                return Result.Fail("Category name cannot be null or empty.");
            }
            var Category =await _CategoryRepository.GetByIdAsync(categoryId);

            if (Category == null)
            {
                return Result.Fail("Category not found.");
            }
          
            
            _mapper.Map(updateRequest,Category);
            _CategoryRepository.UpdateAsync(Category);
            await _CategoryRepository.SaveChangesAsync();
            return Result.Ok();

        }

       public async Task<Result<CoursesByCategoryDto>> GetcoursesByCategroy(int categroyId)
{
    var categories = await _CategoryRepository.GetAllAsync(
        c => c.Id == categroyId,
        includes: new[] { "Courses", "Courses.Instructor" });

    var category = categories.FirstOrDefault();

    if (category == null)
        return Result.Fail("Category not found.");

    // فلترة الكورسات Approved فقط
    category.Courses = category.Courses
        .Where(c => c.Status == CourseStatus.Approved)
        .ToList();

    if (!category.Courses.Any())
        return Result.Fail("No approved courses found for this category.");

    var result = _mapper.Map<CoursesByCategoryDto>(category);
    return Result.Ok(result);
}

        public async Task<Result<CategoryResponseDto>> GetCategoryByIdAsync(int categoryId)
        {
            //throw new NotImplementedException();
            var category = await _CategoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                return Result.Fail("Category not found.");
            }
            //var category = _mapper.Map<Category>(request);

            var categorymaper = _mapper.Map<CategoryResponseDto>(category);
            return Result.Ok(categorymaper);

        }

        public async Task<Result> DeleteCategoryAsync(int id)
        {
            var selectedCategory = await _CategoryRepository.GetByIdAsync(id);
            if (selectedCategory == null)
            {
                return Result.Fail("Category not found.");
            }

            _CategoryRepository.DeleteAsync(selectedCategory);
            await _CategoryRepository.SaveChangesAsync();
            return Result.Ok();
        }
    }

}
