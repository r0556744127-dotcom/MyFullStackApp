using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface ILessonCategoryService
    {
         Task<bool> RestoreLessonCategory(int id);
        Task<List<CreateLessonDto>> GetDeletedCategories();

        // קבלת רשימת שיעורים לפי כיתה

        Task<List<CreateLessonDto>> GetLessonsByClassAsync(string name);
        //יצירת שיעור
        Task<bool> CreateLessonCategoryAsync(CreateLessonDto lesson);
        //Task<bool> UpdateLessonCategoryAsync(int id);
        Task<bool> DeleteLessonCategory(int id);
        //הצגת שיעור ספציפי
       Task<CreateLessonDto> GetLessonCategorysById(int id);
        Task UpdateLessonCategoryAsync(int id, UpdateLessonCategoryDto dto);

    }
}
