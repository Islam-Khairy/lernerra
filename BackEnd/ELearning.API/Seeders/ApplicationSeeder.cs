using ELearning.API.Data;
using ELearning.API.Entites;
using System.Text.Json;

namespace ELearning.API.Seeders
{
    public class ApplicationSeeder:IApplicationsSeeder
    {
        private readonly AppDbContext _context;
        public ApplicationSeeder(AppDbContext context)
        {
            _context = context;
        }
        public async Task Seed()
        {

            if (await _context.Database.CanConnectAsync())
            {
                if (!_context.InstructorApplications.Any())
                {
                    var applicationsPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "Applications.json");
                    var applicationsJson = await File.ReadAllTextAsync(applicationsPath);
                    var applications = JsonSerializer.Deserialize<List<InstructorApplication>>(applicationsJson, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                    if (applications == null) return;
                    await _context.InstructorApplications.AddRangeAsync(applications);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}

