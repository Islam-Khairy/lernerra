﻿using ELearning.API.Services.ChatBot.IServices;
using ELearning.API.Services.ChatBot.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Text;
using System.Text.Json;

public class GeminiService : IGeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly IChatHistoryService _chatHistoryService;
    public IChatHistoryService ChatHistoryService => _chatHistoryService;

    public GeminiService(IConfiguration config, IChatHistoryService chatHistoryService)
    {
        _httpClient = new HttpClient();
        _apiKey = config["Gemini:ApiKey"] ?? throw new Exception("Gemini API Key is missing.");
        _chatHistoryService = chatHistoryService;
    }
    public async Task<List<float>> GetEmbeddingAsync(string text)
    {
        var request = new
        {
            model = "models/embedding-001",
            content = new
            {
                parts = new[]
                {
                new { text }
            }
            }
        };

        var json = JsonSerializer.Serialize(request);
        var message = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key={_apiKey}")
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };

        var response = await _httpClient.SendAsync(message);
        var responseBody = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception("❌ Failed to get embedding: " + responseBody);

        using var doc = JsonDocument.Parse(responseBody);
        var values = doc.RootElement
            .GetProperty("embedding")
            .GetProperty("values")
            .EnumerateArray()
            .Select(v => v.GetSingle())
            .ToList();

        return values;
    }

    public async Task<string> ChatWithHistoryAsync(string userId, string chatId, string userMessage, string instruction)
    {
        var history = await _chatHistoryService.GetChatMessagesAsync(userId, chatId);

        // خذ آخر 10 رسائل فقط
        var limitedHistory = history
            .OrderByDescending(m => m.CreatedAt)
            .Take(10)
            .OrderBy(m => m.CreatedAt)
            .ToList();

        var parts = new List<object>();

        parts.Add(new
        {
            role = "user",
            parts = new[] { new { text = instruction } }
        });

        foreach (var message in limitedHistory)
        {
            var role = message.Role?.ToLower() == "user" ? "user" : "model";

            parts.Add(new
            {
                role = role,
                parts = new[] { new { text = message.Text } }
            });
        }

        // أضف رسالة المستخدم الحالية
        parts.Add(new
        {
            role = "user",
            parts = new[] { new { text = userMessage } }
        });

        var request = new { contents = parts };
        var json = JsonSerializer.Serialize(request);

        var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={_apiKey}";
        var messageRequest = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };

        var response = await _httpClient.SendAsync(messageRequest);
        var responseBody = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception("Failed to get chat response: " + responseBody);

        using var doc = JsonDocument.Parse(responseBody);
        var modelReply = doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

        // 🟢 سجل الرسالة بشكل صحيح في التاريخ
        await _chatHistoryService.SaveMessageAsync(userId, chatId, userMessage, modelReply ?? "No response");

        return modelReply ?? "No response";
    }
    public async Task<string> GetReplyWithCustomPromptAsync(string prompt)
    {
        var request = new
        {
            contents = new[]
            {
            new
            {
                role = "user",
                parts = new[]
                {
                    new { text = prompt }
                }
            }
        }
        };

        var json = JsonSerializer.Serialize(request);

        var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={_apiKey}";
        var messageRequest = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };

        var response = await _httpClient.SendAsync(messageRequest);
        var responseBody = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception("Failed to get custom prompt response: " + responseBody);

        using var doc = JsonDocument.Parse(responseBody);
        var modelReply = doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

        return modelReply ?? "No response";
    }
}