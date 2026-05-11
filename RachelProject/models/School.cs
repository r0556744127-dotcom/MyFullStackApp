using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace codeFirst.models
{
    public class School : DbContext, IContext
    {
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LessonCategory> LessonCategory { get; set; }

        public School(DbContextOptions<School> options) : base(options)
        {
        }

        public School()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=.;database=School_Racheli;trusted_connection=true;TrustServerCertificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // הגדרת טבלאות
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Student>().ToTable("Students");
            modelBuilder.Entity<Staff>().ToTable("Staffs");

            // --- הפתרון לשגיאת ה-Cascade ---
            // הקוד הזה עובר על כל הקשרים (Foreign Keys) ומבטל את המחיקה המשורשרת האוטומטית
            // זה מונע את השגיאה "Introducing FOREIGN KEY constraint may cause cycles"
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.NoAction;
            }

            base.OnModelCreating(modelBuilder);
        }

        public Task SaveAsync()
        {
            return SaveChangesAsync();
        }
    }
}