using ELearning.API.Entites;
using ELearning.API.Extensions;
using ELearning.API.Middlewares;
using ELearning.API.Seeders;
using Infrastructure.Seeders;
using Microsoft.AspNetCore.Identity;
using Stripe;

namespace ELearning.API
{
    public class Program
    {
      public static async Task Main(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddServicesRegisteration(builder.Configuration);
        builder.Services.AddScoped<ErrorHandelingMiddleware>();

    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(
                "http://localhost:4200",
                "https://lernerra-platform.vercel.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
    });

    StripeConfiguration.ApiKey = builder.Configuration["Stripe:Secretkey"];

    var app = builder.Build();

    app.UseCors();

    
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        using (var scope = app.Services.CreateScope())
        {
            //var roleSeeder = scope.ServiceProvider.GetRequiredService<IRoleSeeder>();
            //await roleSeeder.Seed();

            var categorySeeder = scope.ServiceProvider.GetRequiredService<ICategorySeeder>();
            await categorySeeder.Seed();

            var courseSeeder = scope.ServiceProvider.GetRequiredService<ICourseSeeder>();
            await courseSeeder.Seed();

            //var applicationsSeeder = scope.ServiceProvider.GetRequiredService<IApplicationsSeeder>();
            //await applicationsSeeder.Seed();
        }


        app.UseMiddleware<ErrorHandelingMiddleware>();
        app.UseStaticFiles();
        app.UseAuthentication();
        app.UseAuthorization();


        app.MapControllers();

        app.Run();
}
    }
}