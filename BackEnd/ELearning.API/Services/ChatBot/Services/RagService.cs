﻿using ELearning.API.Data;
using ELearning.API.Entites.ChatBot;
using ELearning.API.Services.ChatBot.IServices;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ELearning.API.Services.ChatBot.Services
{
    public class RagService :  IRagService
    {
        private readonly IGeminiService _geminiService;
        private List<DocItem> _documents = new();
        private List<List<float>> _embeddings = new();
        const float SIMILARITY_THRESHOLD = 0.75f;
        private bool _initialized = false;
        public bool IsInitialized => _initialized;

        private readonly AppDbContext _dbContext;

        public RagService(IGeminiService geminiService, AppDbContext dbContext)
        {
            _geminiService = geminiService;
            _dbContext = dbContext;
        }

        public async Task InitializeEmbeddingsAsync()
        {
            if (_initialized) return;

            var courses = _dbContext.Courses
                .AsEnumerable()
                .Where(c => c.Embedding != null && c.Embedding.Length > 0)
                .ToList();

            _documents = courses
                .Select(c => new DocItem
                {
                    Id = c.Id.ToString(),
                    Title = c.Name,
                    Text = c.Description
                }).ToList();

            _embeddings = courses
                .Select(c => EmbeddingHelper.ConvertBytesToEmbedding(c.Embedding))
                .ToList();

            _initialized = true;
        }

        public async Task<string> AnswerQuestionAsync(string userId, string chatId, string question)
        {
            if (string.IsNullOrWhiteSpace(question))
                throw new Exception("Question is empty. Please enter a valid question.");
            if (!_embeddings.Any())
                throw new InvalidOperationException("Embeddings not initialized.");
            Console.WriteLine($"[RAG] Answering for Q: {question}");

            var questionEmbedding = await _geminiService.GetEmbeddingAsync(question);

            int mostRelevantIndex = -1;
            float bestScore = float.MinValue;

            for (int i = 0; i < _embeddings.Count; i++)
            {
                float score = CosineSimilarity(questionEmbedding, _embeddings[i]);
                if (score > bestScore)
                {
                    bestScore = score;
                    mostRelevantIndex = i;
                }
            }

            var questionLang = DetectLanguage(question);

            string instruction = questionLang == "ar"
                ? "من فضلك أجب باللغة العربية فقط."
                : "Please answer in English only.";

            if (bestScore >= SIMILARITY_THRESHOLD)
            {
                var context = _documents[mostRelevantIndex].Text;

                var guidedPrompt = $@"
                    You are an assistant specialized in answering questions about our available courses.

                    Please answer the following user question based only on the provided course content below.

                    Be clear, professional, and concise. {instruction} Do not invent or assume information beyond the given content.

                    ---
                    User Question:
                    {question}

                    ---
                    Course Content:
                    {context}

                    ---
                    Now, please provide a helpful and relevant answer using only the course content above.";

                            var answer = await _geminiService.GetReplyWithCustomPromptAsync(guidedPrompt);

                            await _geminiService.ChatHistoryService.SaveMessageAsync(userId, chatId, question, answer);
                            return answer ?? "No answer returned";
            }
            else
            {
                // 🔁 fallback: الرد الذكي العام (عربي + إنجليزي)
                return await _geminiService.ChatWithHistoryAsync(userId, chatId, question, instruction);
            }
        }

        private float CosineSimilarity(List<float> a, List<float> b)
        {
            if (a.Count != b.Count)
                throw new ArgumentException("Vectors must be of the same length");

            float dot = 0, magA = 0, magB = 0;

            for (int i = 0; i < a.Count; i++)
            {
                dot += a[i] * b[i];
                magA += a[i] * a[i];
                magB += b[i] * b[i];
            }

            if (magA == 0 || magB == 0)
                return 0;

            return dot / (float)(Math.Sqrt(magA) * Math.Sqrt(magB));
        }

        private string DetectLanguage(string text)
        {
            // لو فيه أي حروف عربية
            if (System.Text.RegularExpressions.Regex.IsMatch(text, @"\p{IsArabic}"))
                return "ar";
            else
                return "en";
        }

    }
}