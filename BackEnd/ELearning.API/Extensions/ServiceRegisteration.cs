using ELearning.API.Data;
using ELearning.API.DTOS.JwtSetting;
using ELearning.API.Entites;
using ELearning.API.Middlewares;
using ELearning.API.Repository.IRepository;
using ELearning.API.Repository.Repository;
using ELearning.API.Services.ChatBot.IServices;
using ELearning.API.Services.ChatBot.Services;
using ELearning.API.Seeders;
using ELearning.API.Services.IServices;
using ELearning.API.Services.Services;
using ELearning.API.Settings;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Seeders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace ELearning.API.Extensions
{
    public static class ServiceRegisteration
    {
        public static void AddServicesRegisteration(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.AddDbContext<AppDbContext>(opt =>
                opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Identity Setup
            services.AddIdentityCore<User>()
                .AddRoles<Role>()
                .AddRoleManager<RoleManager<Role>>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<IRoleSeeder, RoleSeeder>();
            services.AddScoped<ICategorySeeder, CategorySeeder>();
            services.AddScoped<ICourseSeeder, CourseSeeder>();
            services.AddScoped<IApplicationsSeeder, ApplicationSeeder>();


            // Scoped Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();
            services.AddScoped<IPasswordResetService, PasswordResetService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IEmailSender, EmailService>();
            services.AddScoped<ErrorHandelingMiddleware>();
            services.AddScoped<ICourseProgressService, CourseProgressService>();
            services.AddScoped<IInstructorApplicationService, InstructorApplicationService>();

            // Chatboot Services
            services.AddScoped<IChatHistoryService, ChatHistoryService>();
            services.AddScoped<IGeminiService, GeminiService>();
            services.AddScoped<IRagService, RagService>();
            services.AddScoped<IEmbeddingUpdater, EmbeddingUpdater>();


            // AutoMapper, Validators, Mail Settings
            services.AddAutoMapper(typeof(ServiceRegisteration).Assembly);

            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IWebhookService, WebhookService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IEnrollmentService, EnrollmentService>();

            services.AddValidatorsFromAssembly(typeof(ServiceRegisteration).Assembly);
            services.Configure<MailSettings>(configuration.GetSection("SendEmailConfig"));
            services.Configure<JwtSetting>(configuration.GetSection("Jwt"));
            services.AddHttpContextAccessor();

            // Identity Options
            services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.User.RequireUniqueEmail = true;
            });

            // FluentValidation
            services.AddFluentValidationAutoValidation()
                    .AddFluentValidationClientsideAdapters();

            // Swagger
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter 'Bearer' followed by your JWT token.\n\nExample: `Bearer abcdef123...`"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.SaveToken = false;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidAudience = configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });
        }
    }
}
