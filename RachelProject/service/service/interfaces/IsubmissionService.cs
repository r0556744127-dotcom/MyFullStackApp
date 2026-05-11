using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IsubmissionService
    {
        Task<List<StudentSubmissionDto>> GetSubmissionByAssignmentid(int assignmentId);
        Task<List<int>> GetSubmittedAssignmentIds(int studentId);
        Task<List<StudentGradeDto>> GetStudentGradesAsync(int studentId);

        // העלאת הגשה חדשה על ידי תלמיד
        Task<bool> SubmitAssignmentAsync(int studentId, CreateSubmissionDto submissionData);
        // קבלת הגשה של תלמיד
         Task<StudentSubmissionDto> GetSubmission(int submissionId);
        // עדכון ציון להגשה ספציפית
        Task<bool> UpdateSubmissionGradeAsync(int submissionId, UpdateGradeDto gradeData);
        Task<bool> DeleteSubmissionAsync(int submissionId);
        Task UpdateSubmissionTeacher(int id,  UpdateGradeDto dto);
        //Task UpdateSubmissionStudent(int id, StudentSubmissionDto item);
        Task<bool> UpdateSubmissionFileAsync(int id, UpdateSubmissionFileDto dto);



    }
}
