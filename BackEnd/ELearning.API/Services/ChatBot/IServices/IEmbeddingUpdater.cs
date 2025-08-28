namespace ELearning.API.Services.ChatBot.IServices
{
    public interface IEmbeddingUpdater
    {
        Task UpdateMissingEmbeddingsAsync();

    }
}
