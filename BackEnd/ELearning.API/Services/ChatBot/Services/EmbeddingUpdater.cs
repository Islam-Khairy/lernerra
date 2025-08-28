﻿using ELearning.API.Data;
using ELearning.API.Services.ChatBot.IServices;
using Microsoft.EntityFrameworkCore;

namespace ELearning.API.Services.ChatBot.Services
{
    public class EmbeddingUpdater : IEmbeddingUpdater
    {
            private readonly AppDbContext _context;
            private readonly IGeminiService _geminiService;

            public EmbeddingUpdater(AppDbContext context, IGeminiService geminiService)
            {
                _context = context;
                _geminiService = geminiService;
            }

            public async Task UpdateMissingEmbeddingsAsync()
            {
                var courses = await _context.Courses
                    .Where(c => c.Embedding == null || c.Embedding.Length == 0)
                    .ToListAsync();

                foreach (var course in courses)
                {
                    var fullText = $"{course.Name}. {course.Description}";
                    var embedding = await _geminiService.GetEmbeddingAsync(fullText);
                    course.Embedding = EmbeddingHelper.ConvertEmbeddingToBytes(embedding);
                }

                await _context.SaveChangesAsync();
            }
        
    }
}