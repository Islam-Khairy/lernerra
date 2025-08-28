namespace ELearning.API.DTOS.CourseDtos
{
    public class CourseUploadRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public string? ImageUrl { get; set; }
        public string? InstructorId { get; set; }
        public int CategoryId { get; set; }
    }
}
