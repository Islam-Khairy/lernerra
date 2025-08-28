using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class User:IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? ImageUrl { get; set; }
        public IEnumerable<Enrollment>? Enrollments { get; set; }
        public InstructorApplication? InstructorApplication { get; set; }
    }
}
