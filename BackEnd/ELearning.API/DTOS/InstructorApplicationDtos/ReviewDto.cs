namespace ELearning.API.DTOS.InstructorApplicationDtos
{
    public class ReviewDto
    {
        public int ApplicationId { get; set; }
        public bool IsApproved { get; set; }
        public string ReviewerAdminEmail { get; set; }
        public string? Notes { get; set; }
    }
}
