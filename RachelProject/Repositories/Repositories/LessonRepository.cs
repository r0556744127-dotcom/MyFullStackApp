using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class LessonRepository : IRepository<Lesson>
    {
        private readonly IContext _context;
        public LessonRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Lesson> AddItem(Lesson item)
        {
            Console.WriteLine($"item is null? {item == null}");
            Console.WriteLine($"_context.Lessons is null? {_context.Lessons == null}"); // ← בדוק זה!

            await _context.Lessons.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }
        //public async Task DeleteItem(int id)
        //{
        //    var lessons = await GetById(id); // מחכים לקבל את האובייקט
        //    if (lessons != null)             // בדיקה שהפריט קיים
        //    {
        //        _context.Lessons.Remove(lessons);
        //        await _context.SaveAsync();     // מחכים שהשמירה תסתיים
        //    }
        //}
        public async Task DeleteItem(int id)
        {
            var lesson = await _context.Lessons
                .Include(l => l.Assignments)
                    .ThenInclude(a => a.Submissions)
                .FirstOrDefaultAsync(l => l.idLesson == id);

            if (lesson == null) return;

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
        public Task<List<Lesson>> GetAllAsync()
        {
            return _context.Lessons.ToListAsync();
        }

        public async Task<Lesson> GetById(int id)
        {
            var exitingLesson = await _context.Lessons
                .Include(l => l.Assignments)
                .FirstOrDefaultAsync(l => l.idLesson == id);
            return exitingLesson;
        }
        public async Task<List<Lesson>> GetLessonByIdLessonCategory(int idCategoy)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(x => x.LessonCategoryId == idCategoy);
            if (lesson == null)
            {
                return new List<Lesson>();
            }
            return await _context.Lessons.Where(l => l.LessonCategoryId == idCategoy).ToListAsync();
        }

        public async Task UpdateItem(int id, Lesson item)
        {
            var lesson = await GetById(id);
            if (lesson != null)
            {
                lesson.dateLesson = item.dateLesson;
                lesson.titelLesson = item.titelLesson;
                lesson.RecordingLink = item.RecordingLink;
                lesson.Transcript = item.Transcript;
                lesson.Summary = item.Summary;
                await _context.SaveAsync();
            }

        }
    }
}
