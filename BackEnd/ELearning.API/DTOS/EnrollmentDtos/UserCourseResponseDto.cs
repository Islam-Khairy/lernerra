using ELearning.API.Entites;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.DTOS.EnrollmentDtos
{
    public class UserCourseResponseDto
    {
        public int courseId { get; set; }

        public string CourseName { get; set; }

        public string Description { get; set; }

        public float Rate { get; set; }

        public string InstructorName { get; set; }

        public string CategoryName { get; set; }

        public List<LessonDto>? Lessons { get; set; }

    }
}
