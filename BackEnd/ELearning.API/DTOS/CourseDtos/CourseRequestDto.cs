namespace ELearning.API.DTOS.CourseDtos
{
    public class CourseRequestDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public float Rate { get; set; }

        public decimal Price { get; set; }

        public string InstructorId { get; set; }

        public int CategoryId { get; set; }
    }
}
