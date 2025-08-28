using ELearning.API.Entites.ChatBot;

namespace ELearning.API.Services.ChatBot.IServices
{
    public interface IChatHistoryService
    {
        Task<ChatSession> CreateNewChatAsync(string userId, string title = "New Chat");
        Task<ChatSession> GetOrCreateChatSessionAsync(string userId);
        Task SaveMessageAsync(string userId, string chatId, string userMessage, string botResponse);
        Task<List<ChatSession>> GetUserChatSessionsAsync(string userId);
        Task<List<ChatMessage>> GetChatMessagesAsync(string userId, string chatId);
    }
}
