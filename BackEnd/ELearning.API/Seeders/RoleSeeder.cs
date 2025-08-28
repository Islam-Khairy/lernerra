
using ELearning.API.Data;
using ELearning.API.Entites;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Seeders
{
    public class RoleSeeder : IRoleSeeder
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly AppDbContext _context;
        public RoleSeeder(RoleManager<Role> roleManager,AppDbContext context)
        {
            _roleManager=roleManager;
            _context = context;
        }

        public async  Task Seed()
        {
            if (await _context.Database.CanConnectAsync())
            {
                if (!_context.Roles.Any())
                {
                    var roles = new[] { "Admin", "Student", "Instructor" };
                    foreach (var roleName in roles)
                    {

                        var role = new Role { Name = roleName };
                        await _roleManager.CreateAsync(role);
                    }
                }

            }
        }
       
    }
}
