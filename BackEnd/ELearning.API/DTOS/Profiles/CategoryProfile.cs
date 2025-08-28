using AutoMapper;
using ELearning.API.DTOS.CategoryDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.Profiles
{
    public class CategoryProfile:Profile
    {

        public CategoryProfile()
        {
            CreateMap(typeof(Category), typeof(CategoryResponseDto));
            CreateMap(typeof(CreateCategoryRequestDto), typeof(Category));
            CreateMap(typeof(Category), typeof(CoursesByCategoryDto));
            //CreateMap<Entites.Category,CategoryDtos.CoursesByCategoryDto>();
            //CreateMap<Entites.Category,CategoryDtos.CreateCategoryRequestDto>();

        }
    }
}
