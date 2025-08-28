namespace ELearning.API.DTOS.EnrollmentDtos
{
    public class LessonDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string VedioURL { get; set; }

        public int Duration { get; set; }

        public DateTime uploadAt { get; set; }

        public bool IsFree { get; set; }
        public int CourseId { get; set; }
    }
}
