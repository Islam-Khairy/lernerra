using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class LessonProgress
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Lesson")]
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CompletedAt { get; set; }
    }
}
