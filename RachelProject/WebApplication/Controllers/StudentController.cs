using Microsoft.AspNetCore.Mvc;
using service.Dto;
using service.interfaces;

namespace WebApplicationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IstudentService _studentService;
        public StudentController(IstudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] UpdateStudentDto dto)
        {
            if (dto == null)
                return BadRequest();
            var existing = await _studentService.GetStudentById(id);
            if (existing == null)
                return NotFound();
            await _studentService.UpdateStudentAsync(id, dto);
            return NoContent();
        }
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] string newPassword)
        {
            var success = await _studentService.UpdateInitialPasswordAsync(id, newPassword);

            if (!success)
            {
                return BadRequest("עדכון הסיסמה נכשל. וודא שהסטודנט קיים במערכת.");
            }

            return Ok("הסיסמה עודכנה בהצלחה.");
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> Login([FromBody] LoginUser loginUser)
        {
            var response = await _studentService.GetStudentLoginAsync(loginUser);

            if (response == null)
            {
                // מחזירים 401 אם השם משתמש או הסיסמה לא נכונים
                return Unauthorized("מספר זהות או סיסמה שגויים.");
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] CreateStudentDto c)
        {
            bool flug = await _studentService.CreateStudentAsync(c);
            if (flug == false)
            {
                return false;
            }
            return true;
        }
        [HttpGet]
        public Task<List<CreateStudentDto>> Get()
        {

            return _studentService.GetAllStudents();

        }
        [HttpGet("{id}")]
        public Task<CreateStudentDto> Get(int id)
        {
            var student = _studentService.GetStudentById(id);
            if (student == null)
                return null;
            return student;

        }
        [HttpGet("{studentId}/submissions")]
        public async Task<ActionResult<List<StudentSubmissionDto>>> GetSubmissions(int studentId)
        {
            var submissions = await _studentService.GetMySubmissionsAsync(studentId);
            if (submissions == null || submissions.Count == 0)
            {
                return NotFound("No submissions found for this student.");
            }
            return Ok(submissions);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, [FromBody] CreateStudentDto studentDto)
        //{
        //    await _studentService.UpdateItem(id, studentDto);
        //    return NoContent();
        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var success = await _studentService.DeleteStudentAsync(id);
            if (!success)
            {
                return NotFound("Student not found.");
            }
            Console.WriteLine("DELETE HIT: " + id);
            return Ok(success);

        }
    }
}