using ELearning.API.Entites;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.DTOS.CategoryDtos
{
    public class CourseDto
    {

        public string Name { get; set; }

        public string Description { get; set; }

        public float Rate { get; set; }

        public decimal Price { get; set; }
        public string Currency { get; set; }


       
        public string? InstructorId { get; set; }

        public int? CategoryId { get; set; }

        public IEnumerable<Lesson>? Lessons { get; set; }

        public IEnumerable<Enrollment>? Enrollments { get; set; }
    }
}
