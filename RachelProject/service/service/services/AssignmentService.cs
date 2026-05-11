using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using service.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Implementations
{

    public class AssignmentService : IAssignmentService
    {
        private readonly AssignmentRepository _assignmentRepository;
        private readonly IMapper _mapper;//מתרגם מ Dto ל model
        public AssignmentService(AssignmentRepository assignmentRepository, IMapper mapper)
        {
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
        }

        public async Task<Assignment> GetAssignmentById(int assignmentId)
        {
            return await _assignmentRepository.GetById(assignmentId);
        }
        //public async Task<List<Assignment>> GetByLessonId(int lessonId)
        public async Task<List<StudentAssignmentDto>> GetAssignmentByLessonId(int lessonId)
        {
            // פנייה ל-Repository לקבלת הישויות
            var existing = await _assignmentRepository.GetByLessonId(lessonId);

            if (existing == null || !existing.Any())
            {
                return new List<StudentAssignmentDto>(); // עדיף להחזיר רשימה ריקה מאשר null
            }

            // המרה מ-Entity ל-DTO בעזרת AutoMapper
            return _mapper.Map<List<StudentAssignmentDto>>(existing);
        }

        public async Task<List<TeacherAssignmentDto>> GetAssignmentsByTeacherAsync(int teacherId)
        {

            var allAssignments = await _assignmentRepository.GetAllAsync();


            var teacherAssignments = allAssignments.Where(a => a.Id == teacherId).ToList();


            return _mapper.Map<List<TeacherAssignmentDto>>(teacherAssignments);
        }
        public async Task<bool> CreateAssignmentAsync(CreateAssignmentDto assignmentDto)
        {
            // 1. בדיקה אם קיים
            var exitingAssignment = await _assignmentRepository.GetById(assignmentDto.Id);
            if (exitingAssignment != null)
                return false;

            string savedPath = null;

            // בדיקה שהקובץ קיים והוא אכן מסוג IFormFile
            if (assignmentDto.File != null)
            {
                // יצירת שם ייחודי לקובץ
                var fileName = $"{Guid.NewGuid()}_{assignmentDto.File.FileName}";
                var path = Path.Combine("wwwroot", "Uploads", fileName);

                // ודואים שהתיקייה קיימת
                var directory = Path.GetDirectoryName(path);
                if (directory != null && !Directory.Exists(directory))
                    Directory.CreateDirectory(directory);

                // שמירת הקובץ בשרת
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await assignmentDto.File.CopyToAsync(stream);
                }

                savedPath = fileName;
            }

            // 2. המרה מה-DTO למודל
            var assignment = _mapper.Map<Assignment>(assignmentDto);

            // 3. עדכון הנתיב בתוך האובייקט
            assignment.FilePath = savedPath;

            // 4. שמירה בבסיס הנתונים
            await _assignmentRepository.AddItem(assignment);
            return true;
        }

        public async Task<bool> DeleteAssignmentAsync(int assignmentId)
        {
            var delAssignment = await _assignmentRepository.GetById(assignmentId);
            if (delAssignment == null)
                return false;
            await _assignmentRepository.DeleteItem(assignmentId);
            return true;
        }
        public async Task<bool> UpdateAssignmentAsync(int id, UpdateAssignmentDto dto)
        {
            var assignment = new Assignment
            {
                Title = dto.Title,
                DueDate = dto.DueDate
            };
            if (dto.NewFile != null && dto.NewFile.Length > 0)
            {
                var uniqueFileName = $"{Guid.NewGuid()}_{dto.NewFile.FileName}";
                var folderPath = Path.Combine("wwwroot", "Uploads");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var filePath = Path.Combine(folderPath, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.NewFile.CopyToAsync(stream);
                }
                assignment.FilePath = uniqueFileName;
            }

            await _assignmentRepository.UpdateItem(id, assignment);
            return true;
        }
    }

}
