using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class StudentRepository : IRepository<Student>
    {
        private readonly IContext _context;

        public StudentRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Student> AddItem(Student item)
        {
            await _context.Student.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }
        //public async Task DeleteItem(int id)
        //{
        //    var student = await GetById(id); // מחכים לקבל את האובייקט
        //    if (student != null)             // בדיקה שהפריט קיים
        //    {
        //        _context.Student.Remove(student);
        //        await _context.SaveAsync();     // מחכים שהשמירה תסתיים
        //    }
        //}
        public async Task DeleteItem(int id)
        {
            var student = await _context.Student
                .Include(s => s.Submissions)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null) return;

            var now = DateTime.UtcNow;

            student.IsDeleted = true;
            student.DeletedAt = now;

            foreach (var submission in student.Submissions ?? new List<Submission>())
            {
                submission.IsDeleted = true;
                submission.DeletedAt = now;
            }

            await _context.SaveAsync();
        }
        public Task<List<Student>> GetAllAsync()
        {
            return _context.Student.ToListAsync();
        }

        public async Task<Student> GetById(int id)
        {
            var result = await _context.Student.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }
        public async Task<User> GetByIdentityNumberAsync(string identityNumber)
        {
            return await _context.Student.FirstOrDefaultAsync(u => u.IdentityNumber.Trim() == identityNumber.Trim());
        }
        public async Task UpdateItem(int id, Student item)
        {
            var student = await GetById(id);
            if (student != null)
            {
                student.FullName = item.FullName;
                student.email = item.email;
                await _context.SaveAsync();
            }
        }


    }
}