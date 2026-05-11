using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IstudentService
    {
        // רשימת ההגשות שהסטודנט כבר ביצע
        Task<UserResponseDto> GetStudentLoginAsync(LoginUser loginUser);
        Task<bool> UpdateInitialPasswordAsync(int studentId, string newPassword);
        Task<bool> UpdateStudentAsync(int id, UpdateStudentDto dto);

        Task<List<StudentSubmissionDto>> GetMySubmissionsAsync(int studentId);
        // יצירת סטודנט חדש
        Task<bool> CreateStudentAsync(CreateStudentDto studentData);
        Task<bool> DeleteStudentAsync(int id);
        Task UpdateItem(int id, CreateStudentDto item);
        Task<List<CreateStudentDto>> GetAllStudents();
        Task<CreateStudentDto> GetStudentById(int id);


    }
}
