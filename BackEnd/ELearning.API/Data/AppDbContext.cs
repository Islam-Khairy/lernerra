using ELearning.API.Constants;
using ELearning.API.Entites;
using ELearning.API.Entites.ChatBot;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ELearning.API.Data;

public class AppDbContext : IdentityDbContext<User, Role, string>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Payment> Payments { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<InstructorApplication> InstructorApplications { get; set; }
    public DbSet<ResetPassword> ResetPassword { get; set; }
    public DbSet<LessonProgress> LessonProgresses { get; set; }
    public DbSet<CourseRating> CourseRatings { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }
    public DbSet<ChatSession> ChatSessions { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure string length for Identity tables (reduced to 85 to avoid index warnings)
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(85);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(85);
        });

        // Configure decimal precision
        modelBuilder.Entity<Course>()
            .Property(c => c.Price)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Enrollment>()
            .Property(e => e.Progress)
            .HasPrecision(5, 2);

        modelBuilder.Entity<Payment>()
            .Property(p => p.Amount)
            .HasPrecision(10, 2);

        // Disable cascade delete for all Identity relationships to prevent multiple cascade paths
        //foreach (var relationship in modelBuilder.Model.GetEntityTypes()
        //    .SelectMany(e => e.GetForeignKeys()))
        //{
        //    relationship.DeleteBehavior = DeleteBehavior.Restrict;
        //}

        modelBuilder.Entity<InstructorApplication>()
            .HasOne(i => i.User)
            .WithOne(u => u.InstructorApplication)
            .HasForeignKey<InstructorApplication>(i => i.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<InstructorApplication>()
            .HasOne(i => i.ReviewedByUser)
            .WithMany()
            .HasForeignKey(i => i.ReviewedBy)
            .OnDelete(DeleteBehavior.Restrict);

    }

}
