namespace ELearning.API.Services.ChatBot.IServices
{
    public interface IGeminiService
    {
        Task<List<float>> GetEmbeddingAsync(string text);
        Task<string> ChatWithHistoryAsync(string userId, string chatId, string userMessage, string instruction);
        Task<string> GetReplyWithCustomPromptAsync(string prompt);
        IChatHistoryService ChatHistoryService { get; }
    }
}
