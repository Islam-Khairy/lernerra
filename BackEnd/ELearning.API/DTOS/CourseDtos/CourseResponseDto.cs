using ELearning.API.DTOS.EnrollmentDtos;
using ELearning.API.DTOS.LessonDtos;
using ELearning.API.DTOS.UserDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.CourseDtos
{
    public class CourseResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public float Rate { get; set; }
        public decimal Price { get; set; }
        public string InstructorName { get; set; }
        public string CategoryName { get; set; }
        public string Status { get; set; }
        public string? Notes { get; set; }
        public string? ImageUrl { get; set; }
        public int? CategoryId { get; set; }
        public UserResponseDto? Instructor { get; set; }
        public IEnumerable<LessonResponseDto>? Lessons { get; set; }
        public IEnumerable<CourseUsersResponseDto>? Enrollments { get; set; }



        public bool IsFree { get; set; }

    }
}
