using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class Lesson
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string VedioURL { get; set; }

        public int Duration { get; set; }

        public DateTime uploadAt { get; set; }

        public bool? IsFree { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }
        public Course Course { get;set; }
    }
}
