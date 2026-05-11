using Repositories.models;
using service.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IClassRoomService
    {
        Task<List<ClassDto>> GetAllClassRoomsByTeacherIdAsync(int teacherId); 
        Task<ClassDto> CreateClassAsync(ClassDto classData);

        // יצירת כיתה חדשה צריך לקבל שם ו ID
        // שליפת פרטי כיתה קיימת כולל חישוב כמות תלמידים
        Task<ClassDetailDto> GetClassRoomDetailsAsync(int classId);
        Task<bool> DeleteClassRoomAsync(int classId);
        Task UpdateItem(int id, UpdateClassRoomDto item);
        Task<List<ClassDto>> getAllClassRoom();
    }
}
