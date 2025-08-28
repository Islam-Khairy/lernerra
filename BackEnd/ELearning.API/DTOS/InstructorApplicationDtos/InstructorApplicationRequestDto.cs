using ELearning.API.Entites;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.DTOS.InstructorApplicationDtos
{
    public class InstructorApplicationRequestDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Specialization { get; set; }

        public string CvUrl { get; set; }
        public string? Notes { get; set; }

    }
}
