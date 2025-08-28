namespace ELearning.API.DTOS.PaymentDtos
{
    public class ConfirmationPaymentDataDto
    {
        public string email { get; set; }
        public string userId { get; set; }
        public string courseName { get; set; }
        public long amount { get; set; }
        public string transaction_Id { get; set; }
        public string payment_date { get; set; }

    }
}
