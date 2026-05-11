using Microsoft.AspNetCore.Mvc;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using service.services;

namespace WebApplicationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;
        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, [FromBody] UpdateStaffDto dto)
        {
            if (dto == null)
                return BadRequest();
            var existing = await _staffService.GetStuffById(id);
            if (existing == null)
                return NotFound();
            await _staffService.UpdateStaffAsync(id, dto);
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<bool>> CreateStaffMember([FromBody] CreateStaffDto staff)
        {
            if (staff == null)
            {
                return BadRequest("נתוני איש צוות חסרים");
            }
            var result = await _staffService.CreateStaffMemberAsync(staff);

            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult<List<CreateStaffDto>>> GetAll()
        {
            var result = await _staffService.GetAllStaff();
            if (result == null) return Ok(new List<CreateStaffDto>());
            return Ok(result);
        }
        [HttpGet("progress/{staffId}")]
        public async Task<ActionResult<StudentDto>> GetStudentProgress(int studentId)
        {
            if (studentId <= 0) return BadRequest();
            var result = await _staffService.GetStudentProgressAsync(studentId);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStuff(int id)
        {
            if (id <= 0) return BadRequest();
            var result = await _staffService.GetStuffById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] string newPassword)
        {
            var success = await _staffService.UpdateInitialPasswordAsync(id, newPassword);

            if (!success)
            {
                return BadRequest("עדכון הסיסמה נכשל. וודא שהסטודנט קיים במערכת.");
            }

            return Ok("הסיסמה עודכנה בהצלחה.");
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> Login([FromBody] LoginUser loginUser)
        {
            var response = await _staffService.GetStaffLoginAsync(loginUser);

            if (response == null)
            {
                // מחזירים 401 אם השם משתמש או הסיסמה לא נכונים
                return Unauthorized("מספר זהות או סיסמה שגויים.");
            }

            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var success = await _staffService.DeleteStaffAsync(id);
            if (!success)
            {
                return NotFound("Staff not found.");
            }
            Console.WriteLine("DELETE HIT: " + id);
            return Ok(success);

        }
    }
}