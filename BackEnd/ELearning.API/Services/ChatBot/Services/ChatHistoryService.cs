﻿using ELearning.API.Data;
using ELearning.API.Entites.ChatBot;
using ELearning.API.Services.ChatBot.IServices;
using Microsoft.EntityFrameworkCore;

namespace ELearning.API.Services.ChatBot.Services
{

    public class ChatHistoryService : IChatHistoryService
    {
        private readonly AppDbContext _dbContext;

        public ChatHistoryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // ✅ إنشاء شات جديد للمستخدم
        public async Task<ChatSession> CreateNewChatAsync(string userId, string title = "New Chat")
        {
            var session = new ChatSession
            {
                ChatId = Guid.NewGuid().ToString(),
                UserId = userId,
                Title = title,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.ChatSessions.Add(session);
            await _dbContext.SaveChangesAsync();
            return session;
        }

        // ✅ جلب أو إنشاء شات افتراضي للمستخدم
        public async Task<ChatSession> GetOrCreateChatSessionAsync(string userId)
        {
            var session = await _dbContext.ChatSessions
                .Where(c => c.UserId == userId)
                .OrderByDescending(c => c.CreatedAt)
                .FirstOrDefaultAsync();

            return session ?? await CreateNewChatAsync(userId);
        }

        // ✅ حفظ رسالة جديدة في الشات
        public async Task SaveMessageAsync(string userId, string chatId, string userMessage, string botResponse)
        {
            var userMsg = new ChatMessage
            {
                UserId = userId,
                ChatId = chatId,
                Role = "user",
                Text = userMessage,
                CreatedAt = DateTime.UtcNow
            };

            var botMsg = new ChatMessage
            {
                UserId = userId,
                ChatId = chatId,
                Role = "bot",
                Text = botResponse,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.ChatMessages.AddRange(userMsg, botMsg);
            await _dbContext.SaveChangesAsync();
        }

        // ✅ جلب كل جلسات المستخدم
        public async Task<List<ChatSession>> GetUserChatSessionsAsync(string userId)
        {
            return await _dbContext.ChatSessions
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        // ✅ جلب الرسائل المرتبطة بشات معين
        public async Task<List<ChatMessage>> GetChatMessagesAsync(string userId, string chatId)
        {
            return await _dbContext.ChatMessages
               .Where(m => m.UserId == userId && m.ChatId == chatId)
               .OrderBy(m => m.CreatedAt)
               .ToListAsync();
        }
    }
    }