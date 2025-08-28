using ELearning.API.Constants;

namespace ELearning.API.DTOS.InstructorApplicationDtos
{
    public class InstructorApplicationResponseDto
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Specialization { get; set; }

        public string CvUrl { get; set; }

        public ApplicationStatus Status { get; set; }

        public DateTime AppliedAt { get; set; }
    }
}
