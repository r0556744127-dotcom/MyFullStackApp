using AutoMapper;
using Org.BouncyCastle.Crypto.Generators;
using Repositories.InterFaces;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;
using BCrypt.Net;
using service.Common;

namespace service.services
{
    public class studentService : IstudentService, IPasswordService
    {
        private readonly StudentRepository _studentRepository;
        private readonly SubmissionRepository _submissionRepository;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenService; // הוספת השירות של הטוקן

        // עדכון הבנאי שיקבל גם את TokenService
        public studentService(StudentRepository studentRepository,
                              SubmissionRepository submissionRepository,
                              IMapper mapper,
                              TokenService tokenService)
        {
            _studentRepository = studentRepository;
            _submissionRepository = submissionRepository;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public async Task<CreateStudentDto> GetStudentById(int id)
        {
            var exitingStudent = await _studentRepository.GetById(id);
            if (exitingStudent == null) return null;
            return _mapper.Map<CreateStudentDto>(exitingStudent);
        }
        public async Task<bool> UpdateStudentAsync(int id, UpdateStudentDto dto)
        {
            var student = new Student
            {
                FullName = dto.FullName,
                email = dto.Email,
                
            };
            await _studentRepository.UpdateItem(id, student);
            return true;
        }
        public async Task<UserResponseDto> GetStudentLoginAsync(LoginUser loginUser)
        {
            var student = await _studentRepository.GetByIdentityNumberAsync(loginUser.identityNumber);

            if (student == null)
            {
                Console.WriteLine("סטודנט לא נמצא ב-DB!"); // זה יעזור לך לדעת אם השליפה נכשלה
                return null;
            }

            bool isPasswordValid = VerifyPassword(loginUser.password, student.Password);
            if (!isPasswordValid)
            {
                Console.WriteLine("סיסמה לא תואמת ל-Hash!"); // זה יעזור לך לדעת אם הבעיה בסיסמה
                return null;
            }

            return _mapper.Map<UserResponseDto>(student);
        }
       
        public async Task<bool> UpdateInitialPasswordAsync(int studentId, string newPassword)
        {
            var student = await _studentRepository.GetById(studentId);
            if (student == null) return false;

            student.Password = HashPassword(newPassword);
            student.MustChangePassword = false;

            await _studentRepository.UpdateItem(studentId, student);
            return true;
        }

        public async Task<bool> CreateStudentAsync(CreateStudentDto studentData)
        {
            // בדיקה אם הסטודנט כבר קיים לפי ID
            var existing = await _studentRepository.GetById(studentData.studentId);
            if (existing != null) return false;

            var student = _mapper.Map<Student>(studentData);

            // הצפנת סיסמה ראשונית (תעודת הזהות שלו)
            student.Password = HashPassword(student.Password);
            student.MustChangePassword = true;

            await _studentRepository.AddItem(student);
            return true;
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            var exists = await _studentRepository.GetById(id);
            if (exists == null) return false;
            await _studentRepository.DeleteItem(id);
            return true;
        }

        public async Task<List<StudentSubmissionDto>> GetMySubmissionsAsync(int studentId)
        {
            var submissions = await _submissionRepository.GetByStudentIdAsync(studentId);
            return submissions == null ? new List<StudentSubmissionDto>() : _mapper.Map<List<StudentSubmissionDto>>(submissions);
        }

        public async Task UpdateItem(int id, CreateStudentDto item)
        {
            await _studentRepository.UpdateItem(id, _mapper.Map<Student>(item));
        }

        public async Task<List<CreateStudentDto>> GetAllStudents()
        {
            var students = await _studentRepository.GetAllAsync();
            return students == null ? new List<CreateStudentDto>() : _mapper.Map<List<CreateStudentDto>>(students);
        }

        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public bool VerifyPassword(string password, string hashedPassword) =>
            BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}
