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
        //כאן מגדירים למערכת איפה נמצא מסד הנתונים
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=.;database=School_Racheli;trusted_connection=true;TrustServerCertificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Student>().ToTable("Students");
            modelBuilder.Entity<Staff>().ToTable("Staffs");

            modelBuilder.Entity<LessonCategory>()
                .HasQueryFilter(lc => !lc.IsDeleted);
            modelBuilder.Entity<Lesson>()
                .HasQueryFilter(l => !l.IsDeleted);
            modelBuilder.Entity<Assignment>()
                .HasQueryFilter(a => !a.IsDeleted);
            modelBuilder.Entity<Submission>()
                .HasQueryFilter(s => !s.IsDeleted);
            modelBuilder.Entity<ClassRoom>()
                .HasQueryFilter(c => !c.IsDeleted);

            // ✅ User בלבד - בלי Student
            modelBuilder.Entity<User>()
                .HasQueryFilter(u => !u.IsDeleted);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
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