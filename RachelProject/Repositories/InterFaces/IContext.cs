using Microsoft.EntityFrameworkCore;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.InterFaces
{
    public interface IContext
    {

        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Staff> Staffs{ get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<LessonCategory> LessonCategory { get; set; }
        public DbSet<User> Users { get; set; }

        Task SaveAsync();


    }
}
