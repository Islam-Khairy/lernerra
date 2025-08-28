using ELearning.API.DTOS.ChatBot;
using ELearning.API.Services.ChatBot.IServices;
using ELearning.API.Services.ChatBot.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {
        private readonly IRagService _ragService;
        private readonly IChatHistoryService _chatHistoryService;
        private readonly IEmbeddingUpdater _embeddingUpdater;

        public ChatBotController(IRagService ragService, IChatHistoryService chatHistoryService, IEmbeddingUpdater embeddingUpdater)
        {
            _ragService = ragService;
            _chatHistoryService = chatHistoryService;
            _embeddingUpdater = embeddingUpdater;
        }

        [Authorize(Roles = "Student")]
        [HttpPost("Ask")]
        public async Task<IActionResult> Ask([FromBody] AskRequest ask)
        {
            var userId = User.FindFirst("uid")?.Value;

            await _ragService.InitializeEmbeddingsAsync();

            var session = await _chatHistoryService.GetOrCreateChatSessionAsync(userId);

            var answer = await _ragService.AnswerQuestionAsync(userId,session.ChatId,ask.Question);
            return Ok(new AskResponse { Answer = answer });

        }

       
        [Authorize(Roles = "Student")]
        [HttpGet("chat-history")]
        public async Task<IActionResult> GetChatHistory()
        {
            var userId = User.FindFirst("uid")?.Value;
            var session = await _chatHistoryService.GetOrCreateChatSessionAsync(userId);
            var messages = await _chatHistoryService.GetChatMessagesAsync(userId, session.ChatId);

            var result = messages
                .OrderBy(m => m.CreatedAt)
                .Select(m => new ChatMessageDto
                {
                    Role = m.Role,
                    Text = m.Text,
                    CreatedAt = m.CreatedAt
                });

            return Ok(result);
        }

    }
}
