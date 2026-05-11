using AutoMapper;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.services
{
    public class LessonCategoryService : ILessonCategoryService
    {

        private readonly LessonCategoryRepository _lessonCategoryRepository;

        private readonly IMapper _mapper;
        public LessonCategoryService(LessonCategoryRepository lessonCategoryRepository, IMapper mapper)
        {
            this._lessonCategoryRepository = lessonCategoryRepository;
            this._mapper = mapper;
        }

        public async Task<bool> CreateLessonCategoryAsync(CreateLessonDto lesson)
        {
            var existing = await _lessonCategoryRepository.GetByNameAndClass(lesson.lessonName, lesson.classId);
            if (existing != null)
                return false;

            // ממפים את ה־DTO לאובייקט Entity
            var newCategory = _mapper.Map<LessonCategory>(lesson);

            // מוסיפים למסד הנתונים
            await _lessonCategoryRepository.AddItem(newCategory);

            return true;
          

        }
        public async Task<bool> RestoreLessonCategory(int id)
        {
            var existing = await _lessonCategoryRepository.GetById(id);
            // אם לא נמצא גם ב-IgnoreQueryFilters נחזיר false
            if (existing == null)
            {
                try
                {
                    await _lessonCategoryRepository.RestoreCategoryAsync(id);
                    return true;
                }
                catch (KeyNotFoundException)
                {
                    return false;
                }
            }
            await _lessonCategoryRepository.RestoreCategoryAsync(id);
            return true;
        }
        public async Task<List<CreateLessonDto>> GetDeletedCategories()
        {
            var deleted = await _lessonCategoryRepository.GetDeletedCategoriesAsync();
            return _mapper.Map<List<CreateLessonDto>>(deleted);
        }
        //public async Task<bool> DeleteLessonCategory(int id)
        //{
        //    var delLes = await _lessonCategoryRepository.GetById(id);
        //    if (delLes == null) return false;
        //    await _lessonCategoryRepository.DeleteItem(id);
        //    return true;
        //}

        public async Task<bool> DeleteLessonCategory(int id)
        {
            var delLes = await _lessonCategoryRepository.GetById(id);
            if (delLes == null) return false;
            await _lessonCategoryRepository.SoftDeleteCategoryAsync(id); // ✅ Soft Delete
            return true;
        }
        public async Task<CreateLessonDto> GetLessonCategorysById(int id)
        {
            var exitingLesson = await _lessonCategoryRepository.GetById(id);
            if (exitingLesson == null)
            {
                return null;
            }
            var lessCategory = _mapper.Map<CreateLessonDto>(exitingLesson);
            return lessCategory;

        }
        // קבלת רשימת שיעורים לפי כיתה
        public async Task<List<CreateLessonDto>> GetLessonsByClassAsync(string className)
        {
            var exitingLesson = await _lessonCategoryRepository.GetLessonsByClassName(className);
            if (exitingLesson == null || !exitingLesson.Any())
                return new List<CreateLessonDto>();
            var lessons = _mapper.Map<List<CreateLessonDto>>(exitingLesson);
            return lessons;
        }
        public async Task UpdateLessonCategoryAsync(int id, UpdateLessonCategoryDto dto)
        {
            var category = new LessonCategory { Name = dto.Name };
            await _lessonCategoryRepository.UpdateItem(id, category);
        }
    }
}
