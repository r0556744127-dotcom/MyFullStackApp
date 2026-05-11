using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
    public class StaffService : IStaffService
    {
        private readonly StaffRepository _staffRepository;
        private readonly LessonRepository _lessonRepository;
        private readonly ClassRoomRepository _classRoomRepository;
        private readonly StudentRepository _studentRepository;
        private readonly IMapper _mapper;

        //Task<StudentDto> GetStudentProgressAsync(int studentId);
        ////האם אני המורה של התלמיד
        //Task<bool> IsTeacherAssignedToClass(int teacherId, int classId, int studentId);
        public StaffService(StaffRepository staffRepository, IMapper mapper, StudentRepository studentRepository)
        {
            _staffRepository = staffRepository;
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public async Task<Staff?> CreateStaffMemberAsync(CreateStaffDto staffData)
        {
            // בדיקה אם מורה עם אותו אימייל כבר קיים
            var existingStaff = await _staffRepository.GetByEmail(staffData.email);
            if (existingStaff != null)
                return null;

            // יצירת אובייקט Staff מה‑DTO
            var staff = _mapper.Map<Staff>(staffData);
            staff.Password = BCrypt.Net.BCrypt.HashPassword(staffData.password);
            staff.email = staffData.email;
            if (staff.Classes == null) staff.Classes = new List<ClassRoom>();
            if (staff.Lessons == null) staff.Lessons = new List<Lesson>();
            // אם יש כיתות, קישור או יצירה
            if (staffData.Classes != null)
            {
                foreach (var classDto in staffData.Classes)
                {
                    ClassRoom classEntity = null;

                    if (classDto.Id != 0)
                        classEntity = await _classRoomRepository.GetById(classDto.Id);

                    if (classEntity == null)
                    {
                        classEntity = new ClassRoom { Name = classDto.Name };
                        await _classRoomRepository.AddItem(classEntity);
                    }

                    staff.Classes.Add(classEntity);
                }
            }

            // אם יש שיעורים, קישור או יצירה
            if (staffData.Lessons != null)
            {
                foreach (var lessonDto in staffData.Lessons)
                {
                    Lesson lesson = null;

                    if (lessonDto.idLesson != 0)
                        lesson = await _lessonRepository.GetById(lessonDto.idLesson);

                    if (lesson == null)
                    {
                        lesson = _mapper.Map<Lesson>(lessonDto);
                        lesson.Teacher = staff;

                        if (lessonDto.classId != 0)
                        {
                            var classEntity = await _classRoomRepository.GetById(lessonDto.classId);
                            if (classEntity != null)
                            {
                                lesson.ClassRoom = classEntity;
                                lesson.ClassRoomId = classEntity.Id;
                            }
                        }

                        await _lessonRepository.AddItem(lesson);
                    }

                    staff.Lessons.Add(lesson);
                }
            }

            // שמירה במסד
            await _staffRepository.AddItem(staff);

            return staff;
        }
        public async Task<bool> DeleteStaffAsync(int id)
        {
            var exists = await _staffRepository.GetById(id);
            if (exists == null) return false;
            await _staffRepository.DeleteItem(id);
            return true;
        }

        //מורה רוצה לראות את פרטי התלמיד
        public async Task<StudentDto> GetStudentProgressAsync(int studentId)
        {
            var existingStudent = await _studentRepository.GetById(studentId);
            if (existingStudent == null)
                return null; // סטודנט לא קיים

            // ממפים ל-DTO
            var studentDto = _mapper.Map<StudentDto>(existingStudent);
            return studentDto;


        }
        public async Task<List<CreateStaffDto>> GetAllStaff()
        {
            var staff = await _staffRepository.GetAllAsync();
            return _mapper.Map<List<CreateStaffDto>>(staff);
        }

        public async Task<Staff> GetStuffById(int id)
        {
            return await _staffRepository.GetById(id);
        }
        public async Task<UserResponseDto> GetStaffLoginAsync(LoginUser loginUser)
        {
            var staff = await _staffRepository.GetByIdentityNumberAsync(loginUser.identityNumber);

            if (staff == null)
            {
                Console.WriteLine("❌ staff לא נמצא");
                return null;
            }

            Console.WriteLine("✅ נמצא staff: " + staff.IdentityNumber);

            bool isPasswordValid = VerifyPassword(loginUser.password, staff.Password);

            Console.WriteLine("Password from client: " + loginUser.password);
            Console.WriteLine("Password hash from DB: " + staff.Password);
            Console.WriteLine("Is valid: " + isPasswordValid);

            if (!isPasswordValid)
            {
                Console.WriteLine("❌ סיסמה לא נכונה");
                return null;
            }

            Console.WriteLine("✅ התחברות הצליחה");

            UserResponseDto response = _mapper.Map<UserResponseDto>(staff);

            // 2. עכשיו הוא חייב להכיר את Role כי הגדרנו אותו בצעד הקודם
            // 1. המיפוי הרגיל ל-DTO
            // 2. המרה בטוחה כדי להגיע ל-Role שנמצא רק ב-Staff
            if (staff is Staff s)
            {
                response.Role = (int)s.Role;
            }

            return response;
        }
        public async Task<bool> UpdateStaffAsync(int id, UpdateStaffDto dto)
        {
            var staff = new Staff
            {
                FullName = dto.FullName,
                email = dto.Email,
                Role = dto.Role
            };
            await _staffRepository.UpdateItem(id, staff);
            return true;
        }
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public bool VerifyPassword(string password, string hashedPassword) =>
            BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        public async Task<bool> UpdateInitialPasswordAsync(int studentId, string newPassword)
        {
            var student = await _studentRepository.GetById(studentId);
            if (student == null) return false;

            student.Password = HashPassword(newPassword);
            student.MustChangePassword = false;

            await _studentRepository.UpdateItem(studentId, student);
            return true;
        }

        public async Task<bool> IsTeacherAssignedToClass(int teacherId, int classId)
        {
            var listClass = await _staffRepository.GetTeacherById(teacherId);

            if (listClass == null || !listClass.Any())
                return false;

            return listClass.Any(c => c.Id == classId);
        }
        public async Task UpdateItem(int id, CreateStaffDto item)
        {
            await _staffRepository.UpdateItem(id, _mapper.Map<Staff>(item));

        }

        public Task<bool> IsTeacherAssignedToClass(int teacherId, int classId, int studentId)
        {
            throw new NotImplementedException();
        }


    }
}
