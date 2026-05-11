using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface ILessonService
    {
        //Task<LessonDto> AddRecordingAndTranscribeAsync(int lessonId, Uri recordingLink);
        //Task<List<CreateLessonDto>> GetLessonsByClassAsync(string name);
        //יצירת שיעור
        Task<bool> CreateLesson(LessonDto lesson);
        Task UpdateLessonAsync(int id, UpdateLessonDto dto);
        Task<List<LessonDto>> GetLessonsByLessonCategory(int categoryId);
        Task<LessonDto> GetLessonById(int id);

        Task<bool> DeleteLesson(int id);

        //Task<bool> UpdateLessonCategoryAsync(int id);


    }

}
