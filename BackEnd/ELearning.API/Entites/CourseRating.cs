using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class CourseRating
    {
        public int Id { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }
        public Course Course { get; set; }

        [ForeignKey("Student")]
        public string StudentId { get; set; }
        public User Student { get; set; }

        public DateTime RatedAt { get; set; } = DateTime.UtcNow;
    }
}
