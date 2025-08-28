using System.ComponentModel.DataAnnotations;

namespace ELearning.API.Entites.ChatBot
{
    public class ChatSession
    {
        [Key]
        public string ChatId { get; set; } = Guid.NewGuid().ToString();
        public string? UserId { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<ChatMessage> Messages { get; set; } = new();
    }
}
