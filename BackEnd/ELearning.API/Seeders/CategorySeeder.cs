using ELearning.API.Data;
using ELearning.API.Entites;
using Infrastructure.Seeders;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace ELearning.API.Seeders
{
    public class CategorySeeder : ICategorySeeder
    {
        private readonly AppDbContext _context;
        public CategorySeeder( AppDbContext context)
        {
            _context = context;
        }
        public async Task Seed()
        {
            
                if (await _context.Database.CanConnectAsync())
                {
                    if (!_context.Categories.Any())
                    {
                    var categoryPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "Categories.json");
                    var categoriesJson = await File.ReadAllTextAsync(categoryPath);
                    var categories = JsonSerializer.Deserialize<List<Category>>(categoriesJson, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    if (categories == null) return;
                    await _context.Categories.AddRangeAsync(categories);
                    await _context.SaveChangesAsync();
                    }
                    

                }
            

        }
    }
}
