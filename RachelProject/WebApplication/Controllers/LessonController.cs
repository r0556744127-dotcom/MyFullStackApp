using Microsoft.AspNetCore.Mvc;
using Repositories.models;
using service.Dto;
using service.interfaces;
using service.services;

namespace WebApplicationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        // POST: api/Lesson
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] LessonDto lessonData)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // ✅ יראה בדיוק איזה שדה חסר

            if (lessonData == null)
                return BadRequest("Body is null");

            var result = await _lessonService.CreateLesson(lessonData);
            if (!result)
                return BadRequest("Lesson creation failed.");

            return Ok("Lesson created successfully.");
        }
        //[HttpPost("upload-video")]
        //[RequestSizeLimit(1073741824)] // 1GB
        //[RequestFormLimits(MultipartBodyLengthLimit = 1073741824)]

        //public async Task<ActionResult> UploadVideo(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("No file uploaded");

        //    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos");
        //    Directory.CreateDirectory(uploadsFolder);

        //    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        //    var filePath = Path.Combine(uploadsFolder, fileName);

        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //        await file.CopyToAsync(stream);

        //    var videoUrl = $"{Request.Scheme}://{Request.Host}/videos/{fileName}";
        //    return Ok(new { url = videoUrl });
        //}
        [HttpPost("upload-video")]
        [RequestSizeLimit(1073741824)]
        [RequestFormLimits(MultipartBodyLengthLimit = 1073741824)]
        public async Task<ActionResult> UploadVideo(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded");

                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var videoUrl = $"{Request.Scheme}://{Request.Host}/videos/{fileName}";
                return Ok(new { url = videoUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // GET: api/Lesson/lessons-by-categoryLesson?categoryId=1
        [HttpGet("lessons-by-categoryLesson")]
        public async Task<ActionResult<List<LessonDto>>> GetLessonsByLessonCategory([FromQuery] int categoryId)
        {
            var lessons = await _lessonService.GetLessonsByLessonCategory(categoryId);

            if (lessons == null || lessons.Count == 0)
                return NotFound("No lessons found for this category.");

            return Ok(lessons);
        }

        // DELETE: api/Lesson/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _lessonService.DeleteLesson(id);
            if (!result)
                return NotFound("Lesson not found.");

            return Ok("Lesson deleted successfully.");
        }

        // GET: api/Lesson/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonDto>> Get(int id)
        {
            var lesson = await _lessonService.GetLessonById(id);
            if (lesson == null)
                return NotFound("Lesson not found.");

            return Ok(lesson);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id, [FromBody] UpdateLessonDto dto)
        {
            if (dto == null)
                return BadRequest();
            var existing = await _lessonService.GetLessonById(id);
            if (existing == null)
                return NotFound();
            await _lessonService.UpdateLessonAsync(id, dto);
            return NoContent();
        }
        [HttpGet("download-video/{fileName}")]
        public IActionResult DownloadVideo(string fileName)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos", fileName);

            if (!System.IO.File.Exists(path))
                return NotFound("File not found");

            var fileBytes = System.IO.File.ReadAllBytes(path);

            Response.Headers.Add("Content-Disposition", "attachment; filename=" + fileName);

            return File(fileBytes, "application/octet-stream");
        }
    }
}