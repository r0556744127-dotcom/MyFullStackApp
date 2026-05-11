using Microsoft.AspNetCore.Mvc;
using Repositories.models;
using service.Dto;
using service.interfaces;

[Route("api/[controller]")]
[ApiController]
public class AssignmentController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;

    public AssignmentController(IAssignmentService assignmentService)
    {
        _assignmentService = assignmentService;
    }
    // 3. המורה צופה בכל המטלות של השיעור שלו לפי ID
    [HttpGet("teacher/all/{teacherId}")]
    public async Task<ActionResult<List<TeacherAssignmentDto>>> GetByTeacher(int teacherId)
    {
        if (teacherId <= 0) return BadRequest("Invalid Teacher ID.");
        var assignments = await _assignmentService.GetAssignmentsByTeacherAsync(teacherId);
        if (assignments == null) return Ok(new List<TeacherAssignmentDto>());

        return Ok(assignments);
    }
    [HttpPost("teacher/create")]
    // המורה יוצר מטלה
    public async Task<ActionResult<bool>> CreateByTeacher([FromForm] CreateAssignmentDto assignmentDto)
    {
        if (assignmentDto == null)
        {
            return BadRequest("there isnt Assignment");
        }
        var result = await _assignmentService.CreateAssignmentAsync(assignmentDto);
        return Ok(result);
    }
    //התלמיד צופה במטלה
    [HttpGet("student/{id}")]
    public async Task<ActionResult<StudentAssignmentDto>> ViewByStudent(int id)
    {
        if (id <= 0)
        {
            return BadRequest("ID invalid.");
        }
        var assignment = await _assignmentService.GetAssignmentById(id);
        if (assignment == null)
        {
            return NotFound($"Assignment with ID {id} was not found.");
        }
        return Ok(assignment);
    }
    [HttpGet("lesson/{lessonId}")]
    public async Task<ActionResult<StudentAssignmentDto>> GetAssignmentsOfLesson(int lessonId)
    {
        var assignment = await _assignmentService.GetAssignmentByLessonId(lessonId);
        if (assignment == null)
        {
            return NotFound($"Assignment with ID {lessonId} was not found.");
        }
        return Ok(assignment);
    }
    // מחיקת מטלה
    [HttpDelete("{assignmentId}")]
    public async Task<ActionResult<bool>> DeleteAssignment(int assignmentId)
    {
        if (assignmentId <= 0) return BadRequest("Invalid Assignment ID.");
        var exists = await _assignmentService.GetAssignmentById(assignmentId);
        if (exists == null) return NotFound("Assignment not found.");
        var result = await _assignmentService.DeleteAssignmentAsync(assignmentId);
        return Ok(result);
    }
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAssignment(int id, [FromForm] UpdateAssignmentDto assignmentDto)
    {
        if (assignmentDto == null)
            return BadRequest("Missing data.");

        var exists = await _assignmentService.GetAssignmentById(id);
        if (exists == null)
            return NotFound($"Assignment {id} not found.");

        await _assignmentService.UpdateAssignmentAsync(id, assignmentDto);
        return NoContent();
    }

}