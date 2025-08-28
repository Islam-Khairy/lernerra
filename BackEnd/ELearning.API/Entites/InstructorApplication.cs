using ELearning.API.Constants;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class InstructorApplication
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Specialization { get; set; }

        public string CvUrl { get; set; }

        public ApplicationStatus Status { get; set; }  

        public DateTime AppliedAt { get; set; } = DateTime.Now;

        public DateTime? ReviewedAt { get; set; }
        public string? Notes { get; set; }
        [ForeignKey("User")]
        public string? UserId { get; set; }
        public User? User { get; set; }  

        [ForeignKey("ReviewedByUser")]
        public string? ReviewedBy { get; set; }
        public User ReviewedByUser { get; set; }
    }
}
