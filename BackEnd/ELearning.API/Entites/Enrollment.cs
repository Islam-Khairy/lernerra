using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    [PrimaryKey(nameof(Student_Id),nameof(Course_Id))]
    public class Enrollment
    {
        [ForeignKey("Students")]
        public string Student_Id { get; set; }

        [ForeignKey("Courses")]
        public int Course_Id { get; set; }

        [ForeignKey("Payment")]
        public int? Payment_Id { get; set; }

        public DateTime EnrollAt { get; set; }
        public decimal Progress { get; set; }
        public User? Students { get; set; }
        public Course? Courses { get; set; }
        public Payment? Payment { get; set; }

    }
}
