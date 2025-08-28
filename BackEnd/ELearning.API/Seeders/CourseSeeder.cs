using ELearning.API.Data;
using ELearning.API.Entites;
using Infrastructure.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ELearning.API.Seeders
{
    public class CourseSeeder : ICourseSeeder
    {
        private readonly AppDbContext _context;
        public CourseSeeder(AppDbContext context)
        {
            _context = context;
        }
        public async Task Seed()
        {

            if (await _context.Database.CanConnectAsync())
            {
                if (!_context.Courses.Any())
                {
                    var coursePath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "Courses.json");
                    var coursesJson = await File.ReadAllTextAsync(coursePath);
                    var courses = JsonSerializer.Deserialize<List<Course>>(coursesJson, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                    if (courses == null) return;
                    await _context.Courses.AddRangeAsync(courses);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
