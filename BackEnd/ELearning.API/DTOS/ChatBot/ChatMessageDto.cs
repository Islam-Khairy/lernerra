namespace ELearning.API.DTOS.ChatBot
{
    public class ChatMessageDto
    {
        public string? Role { get; set; }
        public string? Text { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
