namespace ELearning.API.Services.ChatBot.IServices
{
    public interface IRagService
    {
        Task<string> AnswerQuestionAsync(string userId, string chatId, string question);
        Task InitializeEmbeddingsAsync();
        bool IsInitialized { get; }
    }
}
