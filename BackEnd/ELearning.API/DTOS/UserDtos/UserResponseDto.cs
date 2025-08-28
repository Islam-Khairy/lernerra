using ELearning.API.DTOS.CourseDtos;
using ELearning.API.DTOS.InstructorApplicationDtos;
using ELearning.API.Entites;

namespace ELearning.API.DTOS.UserDtos
{
    public class UserResponseDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string ImageUrl { get; set; }
        public InstructorApplicationResponseDto? instructorApplication { get; set; }
    }
}
