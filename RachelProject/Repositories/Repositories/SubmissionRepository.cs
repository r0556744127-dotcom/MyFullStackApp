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
    public class SubmissionRepository : IRepository<Submission>
    {
        private readonly IContext _context;
        public SubmissionRepository(IContext context)
        {
            _context = context;
        }
        public async Task<List<Submission>> GetGradesByStudentId(int studentId)
        {
            return await _context.Submissions
                .Where(s => s.StudentId == studentId && s.Grade != 0)
                .ToListAsync();
        }
        public async Task<Submission> AddItem(Submission item)
        {
            await _context.Submissions.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }
        //public async Task DeleteItem(int id)
        //{

        //    var submissions = await GetById(id); // מחכים לקבל את האובייקט
        //    if (submissions != null)             // בדיקה שהפריט קיים
        //    {
        //        _context.Submissions.Remove(submissions);
        //        await _context.SaveAsync();     // מחכים שהשמירה תסתיים
        //    }
        //}
        public async Task DeleteItem(int id)
        {
            var submission = await GetById(id);

            if (submission == null) return;

            submission.IsDeleted = true;
            submission.DeletedAt = DateTime.UtcNow;

            await _context.SaveAsync();
        }
        public Task<List<Submission>> GetAllAsync()
        {
            return _context.Submissions.ToListAsync();
        }
        //public async Task<List<Submission>> GetSubmissionsByAssignmentId(int assignmentId)
        //{
        //    return await _context.Submissions
        //        .Include(s => s.Assignment) // טעינת נתוני המטלה (כותרת וכו')
        //        .Include(s => s.Student)    // מומלץ: לטעון גם את נתוני הסטודנט כדי לדעת מי הגיש
        //        .Where(s => s.AssignmentId == assignmentId) // סינון כל ההגשות של המטלה הזו
        //        .ToListAsync(); // החזרת הרשימה המלאה
        //}
        public async Task<List<Submission>> GetSubmissionsByAssignmentId(int assignmentId)
        {
            return await _context.Submissions
                .Include(s => s.Assignment) // טעינת נתוני המטלה (כותרת וכו')
                .Include(s => s.Student)    // מומלץ: לטעון גם את נתוני הסטודנט כדי לדעת מי הגיש
                .Where(s => s.AssignmentId == assignmentId) // סינון כל ההגשות של המטלה הזו
                .ToListAsync(); // החזרת הרשימה המלאה
        }
        public async Task<List<int>> GetSubmittedAssignmentIds(int studentId)
        {
            return await _context.Submissions
                .Where(s => s.StudentId == studentId)
                .Select(s => s.AssignmentId)
                .ToListAsync();
        }
        public async Task<Submission> GetById(int id)
        {
            return await _context.Submissions
                .Include(s => s.Assignment) // זה מה שיאפשר להביא את הכותרת של המטלה
                .FirstOrDefaultAsync(s => s.Id == id);
        }
        //public async Task<Submission> GetById(int id)
        //{
        //    var result = await _context.Submissions.FirstOrDefaultAsync(x => x.Id == id);
        //    return result;
        //}
        public async Task<List<Submission>> GetByStudentIdAsync(int studentId)
        {
            return await _context.Submissions.Where(s => s.StudentId == studentId).ToListAsync();
        }
        public async Task UpdateItem(int id, Submission item)
        {
            var submission = await GetById(id);
            if (submission != null)
            {
                submission.FilePath = item.FilePath;
                submission.Grade = item.Grade;
                submission.TeacherComment = item.TeacherComment;
                await _context.SaveAsync();
            }
        }
        public async Task UpdateGradeOnly(int id, int grade, string? comment)
        {
            var submission = await GetById(id);
            if (submission != null)
            {
                submission.Grade = grade;
                submission.TeacherComment = comment;
                await _context.SaveAsync();
            }
        }

        public async Task UpdateSubmissionFile(int id, string newFilePath)
        {
            var submission = await GetById(id);
            if (submission != null)
            {
                submission.FilePath = newFilePath;
                await _context.SaveAsync();
            }
        }
    }
}
