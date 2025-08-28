using System.ComponentModel.DataAnnotations;

namespace ELearning.API.DTOS.CourseDtos
{
    public class AddRatingRequestDto
    {
        public int CourseId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
