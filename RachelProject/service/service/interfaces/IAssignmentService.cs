using Repositories.models;
using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IAssignmentService
    {
        //Task<List<T>> GetAll();
        //Task<T> GetById(int id);

        //יצירת מטלה
        Task<bool> CreateAssignmentAsync(CreateAssignmentDto assignmentData);
        // מורה רואה את המטלות שהוא נתן עם סיכום הגשות (TotalSubmissions)
        Task<List<TeacherAssignmentDto>> GetAssignmentsByTeacherAsync(int teacherId);

        //מחיקת מטלה שעבר זמן מועד ההגשה
        Task<bool> DeleteAssignmentAsync(int assignmentId);
        Task<Assignment> GetAssignmentById(int assignmentId);
        Task<List<StudentAssignmentDto>> GetAssignmentByLessonId(int lessonId);
        Task<bool> UpdateAssignmentAsync(int id, UpdateAssignmentDto assignmentData);
       
    }
}
