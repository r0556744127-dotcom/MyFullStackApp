using Microsoft.AspNetCore.Mvc;
using service.Dto;
using service.interfaces;

namespace WebApplicationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly IsubmissionService _submissionService;

        public SubmissionController(IsubmissionService submissionService)
        {
            _submissionService = submissionService;
        }

        [HttpGet("student/{studentId}/grades")]
        public async Task<IActionResult> GetStudentGrades(int studentId)
        {
            if (studentId <= 0) return BadRequest();
            var grades = await _submissionService.GetStudentGradesAsync(studentId);
            return Ok(grades);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSubmissionDto>> GetSubmission(int id)
        {
            if (id <= 0) return BadRequest();

            var submission = await _submissionService.GetSubmission(id);
            if (submission == null)
            {
                return NotFound($"Submission with ID {id} not found.");
            }
            return Ok(submission);
        }
        [HttpGet("assignment/{assignmentId}/submissions")]
        public async Task<IActionResult> GetByAssignment(int assignmentId)
        {
            var result = await _submissionService.GetSubmissionByAssignmentid(assignmentId);
            if (result == null) return NotFound("לא נמצאו הגשות למטלה זו.");
            return Ok(result);
        }

        [HttpPost("submit/{studentId}")]
        public async Task<IActionResult> SubmitAssignment(int studentId, [FromForm] CreateSubmissionDto submissionData)
        {
            if (studentId <= 0 || submissionData == null || submissionData.File == null || submissionData.File.Length == 0)
            {
                return BadRequest("Invalid data or missing file.");
            }

            var result = await _submissionService.SubmitAssignmentAsync(studentId, submissionData);
            if (result)
            {
                return Ok("submission submitted successfully.");
            }
            return BadRequest("Failed to submit submission.");
        }

        [HttpPut("grade/{id}")]
        public async Task<IActionResult> UpdateGrade(int id, [FromBody] UpdateGradeDto gradeData)
        {
            if (id <= 0 || gradeData == null) return BadRequest();

            var existing = await _submissionService.GetSubmission(id);
            if (existing == null) return NotFound();

            var result = await _submissionService.UpdateSubmissionGradeAsync(id, gradeData);
            if (result)
            {
                return NoContent();
            }
            return BadRequest("Update failed.");
        }

        [HttpPut("teacher-update/{id}")]
        public async Task<IActionResult> UpdateByTeacher(int id, [FromBody] UpdateGradeDto item) // שינוי כאן!
        {
            if (id <= 0 || item == null) return BadRequest();

            // בדיקה אם הישות קיימת
            var existing = await _submissionService.GetSubmission(id);
            if (existing == null) return NotFound();

            // שליחה ל-Service
            await _submissionService.UpdateSubmissionTeacher(id, item);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubmission(int id)
        {
            if (id <= 0) return BadRequest();

            var result = await _submissionService.DeleteSubmissionAsync(id);
            if (result)
            {
                return Ok("Deleted successfully.");
            }
            return NotFound();
        }
        [HttpGet("student/{studentId}/submitted")]
        public async Task<IActionResult> GetSubmittedAssignments(int studentId)
        {
            var ids = await _submissionService.GetSubmittedAssignmentIds(studentId);
            return Ok(ids);
        }
        [HttpPut("update-file/{id}")]
        public async Task<IActionResult> UpdateSubmissionFile(int id, [FromForm] UpdateSubmissionFileDto dto)
        {
            if (dto == null || dto.NewFile == null)
                return BadRequest("חסר קובץ.");

            var existing = await _submissionService.GetSubmission(id);
            if (existing == null)
                return NotFound();

            var result = await _submissionService.UpdateSubmissionFileAsync(id, dto);
            if (result)
                return NoContent();

            return BadRequest("עדכון הקובץ נכשל.");
        }
    }
}