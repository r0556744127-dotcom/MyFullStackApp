using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class AssignmentRepository : IRepository<Assignment>
    {
        
        private readonly IContext _context;

        public AssignmentRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Assignment> AddItem(Assignment item)
        {
            await _context.Assignments.AddAsync(item);
            await _context.SaveAsync();
            return item;

        }
      
        public async Task<List<Assignment>> GetByLessonId(int lessonId)
        {
            // משתמשים ב-Where כדי לסנן ורק אז ב-ToListAsync כדי לבצע את השאילתה
            var result = await _context.Assignments
                                       .Where(x => x.LessonId == lessonId)
                                       .ToListAsync();
            return result;
        }

        //public async Task DeleteItem(int id)
        //{
        //    var assignment = await GetById(id); // מחכים לקבל את האובייקט
        //    if (assignment != null)             // בדיקה שהפריט קיים
        //    {
        //        _context.Assignments.Remove(assignment);
        //        await _context.SaveAsync();     // מחכים שהשמירה תסתיים
        //    }
        //}
        public async Task DeleteItem(int id)
        {
            var assignment = await _context.Assignments
                .Include(a => a.Submissions)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (assignment == null) return;

            var now = DateTime.UtcNow;

            assignment.IsDeleted = true;
            assignment.DeletedAt = now;

            foreach (var submission in assignment.Submissions)
            {
                submission.IsDeleted = true;
                submission.DeletedAt = now;
            }

            await _context.SaveAsync();
        }
        public Task<List<Assignment>> GetAllAsync()
        {
            return _context.Assignments.ToListAsync();
        }


        public async Task<Assignment> GetById(int id)
        {
            var result = await _context.Assignments.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }

        public async Task UpdateItem(int id, Assignment item)
        {
            var assignment = await GetById(id);
            if (assignment != null)
            {
                assignment.Title = item.Title;
                assignment.DueDate = item.DueDate;
                // FilePath רק אם הגיע קובץ חדש
                if (!string.IsNullOrEmpty(item.FilePath))
                    assignment.FilePath = item.FilePath;

                await _context.SaveAsync();
            }
        }

    }
}
