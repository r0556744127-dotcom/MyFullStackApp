using AutoMapper;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Implementations
{
    public class SubmissionService : IsubmissionService
    {
        private readonly SubmissionRepository _submissionRepository;
        private readonly AssignmentRepository _assignmentRepository;
        private readonly IMapper _mapper;
        public SubmissionService(SubmissionRepository submissionRepository, AssignmentRepository assignmentRepository, IMapper mapper)
        {
            _submissionRepository = submissionRepository;
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
        }
        public async Task<List<StudentGradeDto>> GetStudentGradesAsync(int studentId)
        {
            var submissions = await _submissionRepository.GetGradesByStudentId(studentId);
            return submissions.Select(s => new StudentGradeDto
            {
                AssignmentId = s.AssignmentId,
                Grade = s.Grade,
                TeacherComment = s.TeacherComment
            }).ToList();
        }
        public async Task<bool> DeleteSubmissionAsync(int submissionId)
        {
            var submission = await _submissionRepository.GetById(submissionId);
            if (submission == null)
            {
                return false;
            }
            await _submissionRepository.DeleteItem(submissionId);
            return true;
        }
        public async Task<List<StudentSubmissionDto>> GetSubmissionByAssignmentid(int assignmentId)
        {
            // 1. שליפת כל ההגשות מה-Repository
            var submissions = await _submissionRepository.GetSubmissionsByAssignmentId(assignmentId);

            if (submissions == null || !submissions.Any())
                return new List<StudentSubmissionDto>(); // עדיף להחזיר רשימה ריקה מאשר null

            // 2. מיפוי הרשימה מהישות ל-DTO
            // שימי לב: המיפוי הוא ל-List של ה-Dto
            var result = _mapper.Map<List<StudentSubmissionDto>>(submissions);

            return result;
        }
        //// עדכון ציון להגשה ספציפית
        //Task<bool> UpdateSubmissionGradeAsync(int submissionId, UpdateGradeDto gradeData);
        public async Task<StudentSubmissionDto> GetSubmission(int submissionId)
        {
            var submission1 = await _submissionRepository.GetById(submissionId);
            if (submission1 == null)
                return null;
            var submission2 = _mapper.Map<StudentSubmissionDto>(submission1);
            return submission2;
        }
        public async Task<bool> SubmitAssignmentAsync(int studentId, CreateSubmissionDto submissionData)
        {
            var uniqueFileName = $"{Guid.NewGuid()}_{submissionData.File.FileName}";

            var folderPath = Path.Combine("wwwroot", "Submissions");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await submissionData.File.CopyToAsync(stream);
            }

            var submission = _mapper.Map<Submission>(submissionData);
            submission.FilePath = uniqueFileName;
            submission.SubmittedAt = DateTime.Now;
            submission.Grade = 0;
            submission.TeacherComment = "";

            await _submissionRepository.AddItem(submission);

            return true;
        }


        //public async Task<bool> SubmitAssignmentAsync(int studentId, CreateSubmissionDto submissionData)
        //{
        //    var uniqueFileName = $"{Guid.NewGuid()}_{submissionData.File.FileName}";
        //    var folderPath = Path.Combine("Submissions"); // תיקיית שמירת הקבצים
        //    if (!Directory.Exists(folderPath))
        //        Directory.CreateDirectory(folderPath);

        //    var filePath = Path.Combine(folderPath, uniqueFileName);
        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    {
        //        await submissionData.File.CopyToAsync(stream);
        //    }

        //    var submission = _mapper.Map<Submission>(submissionData);
        //    submission.FilePath = uniqueFileName;
        //    submission.SubmittedAt = DateTime.Now; // זמן הגשה
        //    submission.Grade = 0;
        //    submission.TeacherComment = "";
        //    await _submissionRepository.AddItem(submission);

        //    return true;
        //}
        //public async Task<bool> UpdateSubmissionGradeAsync(int submissionId, UpdateGradeDto gradeData)
        //{
        //    if(submissionId ==0)
        //        return false;
        //    await _submissionRepository.UpdateItem(submissionId, _mapper.Map<Submission>(gradeData));
        //    return true;
        //}
        public async Task<bool> UpdateSubmissionGradeAsync(int submissionId, UpdateGradeDto gradeData)
        {
            if (submissionId <= 0) return false;

            // קריאה ישירה בלי Mapper ובלי UpdateItem הכללית
            await _submissionRepository.UpdateGradeOnly(submissionId, gradeData.Grade, gradeData.TeacherComment);
            return true; // החזרת תשובה חיובית ל-Controller
        }
      
        public async Task<List<int>> GetSubmittedAssignmentIds(int studentId)
        {
            return await _submissionRepository.GetSubmittedAssignmentIds(studentId);
        }
        public async Task UpdateSubmissionTeacher(int id, UpdateGradeDto dto)
        {
            await _submissionRepository.UpdateGradeOnly(id, dto.Grade, dto.TeacherComment);
        }
       
        //public async Task UpdateSubmissionStudent(int id,StudentSubmissionDto  item)
        //{
        //    await _submissionRepository.UpdateItem(id, _mapper.Map<Submission>(item));

        //}
        public async Task<bool> UpdateSubmissionFileAsync(int id, UpdateSubmissionFileDto dto)
        {
            if (dto.NewFile == null || dto.NewFile.Length == 0)
                return false;

            var uniqueFileName = $"{Guid.NewGuid()}_{dto.NewFile.FileName}";
            var folderPath = Path.Combine("wwwroot", "Submissions");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, uniqueFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.NewFile.CopyToAsync(stream);
            }

            await _submissionRepository.UpdateSubmissionFile(id, uniqueFileName);
            return true;
        }
    }
}
