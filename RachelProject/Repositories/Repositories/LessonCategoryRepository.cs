using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Repositories.Repositories
{
    public class LessonCategoryRepository : IRepository<LessonCategory>
    {
        private readonly IContext _context;
        public LessonCategoryRepository(IContext context)
        {
            _context = context;
        }

        public async Task<LessonCategory> AddItem(LessonCategory item)
        {
            await _context.LessonCategory.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var lessons = await GetById(id); // מחכים לקבל את האובייקט
            if (lessons != null)             // בדיקה שהפריט קיים
            {
                _context.LessonCategory.Remove(lessons);
                await _context.SaveAsync();     // מחכים שהשמירה תסתיים
            }
        }
        public async Task SoftDeleteLessonAsync(int lessonId)
        {
            var lesson = await _context.Lessons
                .Include(l => l.Assignments)
                    .ThenInclude(a => a.Submissions)
                .FirstOrDefaultAsync(l => l.idLesson == lessonId);

            if (lesson == null)
                throw new KeyNotFoundException("שיעור לא נמצא");

            var now = DateTime.UtcNow;

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

            await _context.SaveAsync();
        }
        // מחיקת קטגוריה + כל מה שתחתיה
        public async Task SoftDeleteCategoryAsync(int categoryId)
        {
            var category = await _context.LessonCategory
                .Include(lc => lc.Lessons)
                    .ThenInclude(l => l.Assignments)
                        .ThenInclude(a => a.Submissions)
                .FirstOrDefaultAsync(lc => lc.Id == categoryId);

            if (category == null)
                throw new KeyNotFoundException("קטגוריה לא נמצאה");

            var now = DateTime.UtcNow;

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

            await _context.SaveAsync();
        }
        public async Task RestoreCategoryAsync(int categoryId)
        {
            var category = await _context.LessonCategory
                .IgnoreQueryFilters() // חשוב! בלי זה לא ימצא את המחוקות
                .Include(lc => lc.Lessons)
                    .ThenInclude(l => l.Assignments)
                        .ThenInclude(a => a.Submissions)
                .FirstOrDefaultAsync(lc => lc.Id == categoryId);

            if (category == null)
                throw new KeyNotFoundException("קטגוריה לא נמצאה");

            category.IsDeleted = false;
            category.DeletedAt = null;

            foreach (var lesson in category.Lessons)
            {
                lesson.IsDeleted = false;
                lesson.DeletedAt = null;

                foreach (var assignment in lesson.Assignments)
                {
                    assignment.IsDeleted = false;
                    assignment.DeletedAt = null;

                    foreach (var submission in assignment.Submissions)
                    {
                        submission.IsDeleted = false;
                        submission.DeletedAt = null;
                    }
                }
            }

            await _context.SaveAsync();
        }
        public Task<List<LessonCategory>> GetAllAsync()
        {
            return _context.LessonCategory.ToListAsync();
        }
        public async Task<List<LessonCategory>> GetDeletedCategoriesAsync()
        {
            return await _context.LessonCategory
                .IgnoreQueryFilters()
                .Where(lc => lc.IsDeleted)
                .ToListAsync();
        }
        public async Task<LessonCategory> GetById(int id)
        {
            var result = await _context.LessonCategory.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }
        public string NormalizeName(string name)
        {
            return Regex.Replace(name, @"[^א-ת0-9]", "").ToLower();
        }
        public async Task<List<LessonCategory>> GetLessonsByClassName(string className)
        {
            var normalized = NormalizeName(className);
            //מביא את כל הכיתות

            var classRoom = await _context.ClassRooms
                .ToListAsync();


            var matchClass = classRoom
                .FirstOrDefault(c => NormalizeName(c.Name) == normalized);

            if (matchClass == null)
                return new List<LessonCategory>();

            return await _context.LessonCategory
                .Where(l => l.ClassRoomId == matchClass.Id)
                .ToListAsync();
        }

        public async Task<LessonCategory> GetByName(string name)
        {
            var normalized = NormalizeName(name);

            var categories = await _context.LessonCategory.ToListAsync();

            return categories.FirstOrDefault(x => NormalizeName(x.Name) == normalized);
        }
        public async Task<LessonCategory> GetByNameAndClass(string name, int classId)
        {
            var normalized = NormalizeName(name);

            // ביצוע החיפוש ישירות מול מסד הנתונים (יעיל בהרבה)
            // הוספנו תנאי שבודק גם את ה-ClassRoomId
            return await _context.LessonCategory
                .FirstOrDefaultAsync(x => x.Name.Trim().ToLower() == normalized && x.ClassRoomId == classId);
        }
        public async Task UpdateItem(int id, LessonCategory item)
        {
            var category = await GetById(id);
            if (category != null)
            {
                category.Name = item.Name;
                await _context.SaveAsync();
            }
        }

    }
}
