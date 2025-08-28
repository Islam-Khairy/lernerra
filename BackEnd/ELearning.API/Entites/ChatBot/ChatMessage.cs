using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites.ChatBot
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        [ForeignKey("ChatSession")]
        public string? ChatId { get; set; }
        public string? Role { get; set; } // "user" or "bot"
        public string? Text { get; set; }
        public DateTime? CreatedAt { get; set; }

        public ChatSession? ChatSession { get; set; }
    }
}
