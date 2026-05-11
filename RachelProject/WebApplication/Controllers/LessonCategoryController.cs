using Microsoft.AspNetCore.Mvc;
using Repositories.models;
using service.Dto;
using service.Implementations;
using service.interfaces;
using service.services;

namespace WebApplicationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonCategoryController : ControllerBase
    {
        private readonly ILessonCategoryService _lessonCategoryService;
        public LessonCategoryController(ILessonCategoryService lessonCategoryService)
        {
            _lessonCategoryService = lessonCategoryService;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CreateLessonDto classData)
        {
            var result = await _lessonCategoryService.CreateLessonCategoryAsync(classData);
            if (!result) return BadRequest("Lesson category already exists.");
            return Ok("Lesson category created successfully.");
        }
        [HttpGet("lessons-by-class")]
        public async Task<ActionResult<List<LessonCategory>>> GetLessonsByClass(string className)
        {
            var lessons = await _lessonCategoryService.GetLessonsByClassAsync(className);

            if (lessons == null || lessons.Count == 0)
                return NotFound("No lessons found for this class");

            return Ok(lessons);
        }
        //[HttpDelete("{classId}")]
        //public async Task<ActionResult<bool>> Delete(int id)
        //{
        //    var result = await _lessonCategoryService.DeleteLessonCategory(id);
        //    return Ok(result);
        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id) // ✅ תוקן
        {
            var result = await _lessonCategoryService.DeleteLessonCategory(id);
            if (!result) return NotFound("קטגוריה לא נמצאה");
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<CreateLessonDto> Get(int id)
        {
            var lesson = await _lessonCategoryService.GetLessonCategorysById(id);
            if (lesson == null)
                return null;
            return lesson;

        }
        [HttpPut("restore/{id}")]
        public async Task<ActionResult> Restore(int id)
        {
            var result = await _lessonCategoryService.RestoreLessonCategory(id);
            if (!result) return NotFound("קטגוריה לא נמצאה");
            return Ok("הקטגוריה שוחזרה בהצלחה");
        }
        [HttpGet("deleted")]
        public async Task<ActionResult> GetDeleted()
        {
            var deleted = await _lessonCategoryService.GetDeletedCategories();
            return Ok(deleted);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLessonCategory(int id, [FromBody] UpdateLessonCategoryDto dto)
        {
            if (dto == null)
                return BadRequest();
            var existing = await _lessonCategoryService.GetLessonCategorysById(id); // זה השם הנכון
            if (existing == null)
                return NotFound();
            await _lessonCategoryService.UpdateLessonCategoryAsync(id, dto);
            return NoContent();
        }
    }
}