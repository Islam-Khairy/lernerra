namespace ELearning.API.DTOS.EnrollmentDtos
{
    public class CourseUsersResponseDto
    {
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public DateTime EnrollAt { get; set; }
        public decimal Progress { get; set; }


    }
}
