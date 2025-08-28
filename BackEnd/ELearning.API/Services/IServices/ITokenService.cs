using ELearning.API.Entites;

namespace ELearning.API.Services.IServices
{
    public interface ITokenService
    {
        Task<string> GenerateAccessTokenAsync(User user);
    }
}
