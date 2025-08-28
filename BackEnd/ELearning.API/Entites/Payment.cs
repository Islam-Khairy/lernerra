using ELearning.API.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
   
    public class Payment
    {
        
        public int ID { get; set; }
     

        [ForeignKey("Student")]
        public string Student_Id { get; set; }

        [ForeignKey("Course")]
        public int Course_Id { get; set; }

        public decimal Amount { get; set; }
        public string Currency { get; set; } = "usd";


        public string PaymentIntentId { get; set; } = null!;
        public string? PaymentMethodId { get; set; }
        //public DateTime Date { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ConfirmedAt { get; set; }

        public PaymentStatus Status { get; set; }

        public User? Student { get; set; }

        public List<Course>? Courses { get; set; }
        //public ICollection<PaymentCourse> PaymentCourses { get; set; } = new List<PaymentCourse>();




    }
}
