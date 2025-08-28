namespace ELearning.API.DTOS.CourseProgressDtos
{
    public class CourseProgressDto
    {
        public int CourseId { get; set; }
        public string UserId { get; set; }
        public double ProgressPercentage { get; set; }
    }
}
