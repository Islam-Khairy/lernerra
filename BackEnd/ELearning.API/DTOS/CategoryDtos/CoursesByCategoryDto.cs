using ELearning.API.DTOS.CourseDtos;

namespace ELearning.API.DTOS.CategoryDtos
{
    public class CoursesByCategoryDto
    {
        public string Name { get; set; }
        public IEnumerable<CourseResponseDto> Courses { get; set; }
    }
}
