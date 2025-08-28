using ELearning.API.Constants;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public float Rate { get; set; }

        public decimal Price { get; set; }

        public string Currency { get; set; }

        public string? ImageUrl { get; set; }
        public string? Notes { get; set; }


        public CourseStatus Status { get; set; } = CourseStatus.Pending;

        [ForeignKey("Instructor")]
        public string? InstructorId { get; set; }
        public User? Instructor { get; set; }

        [ForeignKey("Category")]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

        public IEnumerable<Lesson>? Lessons { get; set; }

        public IEnumerable<Enrollment>? Enrollments { get; set; }

        public IEnumerable<CourseRating>? Ratings { get; set; }

        public byte[]? Embedding { get; set; }

    }
}
