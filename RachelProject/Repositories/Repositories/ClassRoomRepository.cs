using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class ClassRoomRepository : IRepository<ClassRoom>
    {
        private readonly IContext _context;

        // שכחנו בנאי
        public ClassRoomRepository(IContext context)
        {
            _context = context;
        }
        //public async Task DeleteItem(int id)
        //{
        //    var classRoom = await _context.ClassRooms
        //        .Include(c => c.Students)
        //        .Include(c => c.LessonCategories)
        //            .ThenInclude(lc => lc.Lessons)
        //                .ThenInclude(l => l.Assignments)
        //                    .ThenInclude(a => a.Submissions)
        //        .FirstOrDefaultAsync(c => c.Id == id);

        //    if (classRoom == null) return;

        //    var now = DateTime.UtcNow;

        //    classRoom.IsDeleted = true;
        //    classRoom.DeletedAt = now;

        //    foreach (var category in classRoom.LessonCategories)
        //    {
        //        category.IsDeleted = true;
        //        category.DeletedAt = now;

        //        foreach (var lesson in category.Lessons)
        //        {
        //            lesson.IsDeleted = true;
        //            lesson.DeletedAt = now;

        //            foreach (var assignment in lesson.Assignments)
        //            {
        //                assignment.IsDeleted = true;
        //                assignment.DeletedAt = now;

        //                foreach (var submission in assignment.Submissions)
        //                {
        //                    submission.IsDeleted = true;
        //                    submission.DeletedAt = now;
        //                }
        //            }
        //        }
        //    }

        //    await _context.SaveAsync();
        //}
        public async Task DeleteItem(int id)
        {
            var classRoom = await _context.ClassRooms
                .Include(c => c.Students)
                    .ThenInclude(s => s.Submissions) // ✅ חדש - טוען גם הגשות של תלמידים
                .Include(c => c.LessonCategories)
                    .ThenInclude(lc => lc.Lessons)
                        .ThenInclude(l => l.Assignments)
                            .ThenInclude(a => a.Submissions)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (classRoom == null) return;

            var now = DateTime.UtcNow;

            classRoom.IsDeleted = true;
            classRoom.DeletedAt = now;

            // ✅ חדש - מחיקת תלמידים והגשות שלהם
            foreach (var student in classRoom.Students)
            {
                student.IsDeleted = true;
                student.DeletedAt = now;

                foreach (var submission in student.Submissions ?? new List<Submission>())
                {
                    submission.IsDeleted = true;
                    submission.DeletedAt = now;
                }
            }

            foreach (var category in classRoom.LessonCategories)
            {
                category.IsDeleted = true;
                category.DeletedAt = now;

                foreach (var lesson in category.Lessons)
                {
                    lesson.IsDeleted = true;
                    lesson.DeletedAt = now;

                    foreach (var assignment in lesson.Assignments)
                    {
                        assignment.IsDeleted = true;
                        assignment.DeletedAt = now;

                        foreach (var submission in assignment.Submissions)
                        {
                            submission.IsDeleted = true;
                            submission.DeletedAt = now;
                        }
                    }
                }
            }

            await _context.SaveAsync();
        }
        public async Task<ClassRoom> AddItem(ClassRoom item)
        {
            await _context.ClassRooms.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }

        //public async Task DeleteItem(int id)
        //{
        //    var classRooms = await GetById(id);
        //    if (classRooms != null)
        //    {
        //        _context.ClassRooms.Remove(classRooms);
        //        await _context.SaveAsync();
        //    }
        //}
        public async Task<List<ClassRoom>> GetAllAsync()
        {
            var list = await _context.ClassRooms.ToListAsync();
            return list;
        }
        //   public async Task<ClassRoom> GetById(int id)
        //   {
        //       var classRoom = await _context.ClassRooms
        //.Include(c => c.Students)                       // טוען תלמידים
        //.Include(c => c.LessonCategories)               // טוען קטגוריות
        //    .ThenInclude(lc => lc.Lessons)             // ← טוען גם את השיעורים בתוך הקטגוריה
        //.FirstOrDefaultAsync(c => c.Id == id);
        //       return classRoom;
        //   }
        public async Task<ClassRoom> GetById(int id)
        {
            var classRoom = await _context.ClassRooms
                .Include(c => c.Students)
                .Include(c => c.LessonCategories)
                    .ThenInclude(lc => lc.Lessons)
                        .ThenInclude(l => l.Assignments) // ← חסר זה!
                .FirstOrDefaultAsync(c => c.Id == id);
            return classRoom;
        }

        public async Task UpdateItem(int id, ClassRoom item)
        {
            var classRoom = await GetById(id);
            if (classRoom != null)
            {
                classRoom.Name = item.Name;
              
                await _context.SaveAsync();
            }
        }

        public async Task<List<ClassRoom>> GetClassesByTeacherIdAsync(int teacherId)
        {
            return await _context.Lessons
                .Where(l => l.TeacherId == teacherId) // סנן את כל השיעורים של המורה
                .Select(l => l.ClassRoom)            // בחר רק את הכיתות שלהם
                .Distinct()                          // הסר כפילויות (אם הוא מלמד כמה שיעורים באותה כיתה)
                .ToListAsync();
        }
    }
}