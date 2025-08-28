using ELearning.API.Constants;

namespace ELearning.API.DTOS.PaymentDtos
{
    public class PaymentDataDto
    {
        public string UserId { get; set; }
        public int CoursesId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public DateTime CreatedAt { get; set; }
        public PaymentStatus Status { get; set; } // e.g., "Pending", "Completed", "Failed"
        public string PaymentMethod { get; set; } // e.g., "CreditCard"
        public string PaymentIntentId { get; set; } // Unique identifier for the transaction
    }
}
