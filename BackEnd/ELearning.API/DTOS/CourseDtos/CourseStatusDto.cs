using ELearning.API.Constants;

namespace ELearning.API.DTOS.CourseDtos
{
    public class CourseStatusDto
    {
        public int CourseId { get; set; }
        public CourseStatus Status { get; set; }
        public string? Notes { get; set; }

    }
}
