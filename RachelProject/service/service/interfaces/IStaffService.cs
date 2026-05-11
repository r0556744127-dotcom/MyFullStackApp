using Repositories.models;
using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IStaffService
    {
        Task<bool> UpdateStaffAsync(int id, UpdateStaffDto dto);
        Task<UserResponseDto> GetStaffLoginAsync(LoginUser loginUser);
        Task<bool> UpdateInitialPasswordAsync(int staffId, string newPassword);
        Task<Staff?> CreateStaffMemberAsync(CreateStaffDto staffData);
        //מורה רוצה לראות את פרטי התלמיד
        Task<bool> DeleteStaffAsync(int id);

        Task<StudentDto> GetStudentProgressAsync(int studentId);
        //האם אני המורה של התלמיד
        Task<bool> IsTeacherAssignedToClass(int teacherId, int classId, int studentId);
        Task UpdateItem(int id, CreateStaffDto item);
        Task<Staff> GetStuffById(int id);
        Task<List<CreateStaffDto>> GetAllStaff();

    }
}
