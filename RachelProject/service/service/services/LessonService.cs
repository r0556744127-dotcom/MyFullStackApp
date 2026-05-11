using AutoMapper;
using Repositories.models;
using Repositories.Repositories;
using service.Dto;
using service.interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.services
{
    public class LessonService : ILessonService
    {
        private readonly LessonRepository _lessonRepository;
        // private readonly ITranscriptionService _transcriptionService;
        private readonly IMapper _mapper;

        public LessonService(LessonRepository lessonRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            // _transcriptionService = transcriptionService;
            _mapper = mapper;
        }
        public async Task UpdateLessonAsync(int id, UpdateLessonDto dto)
        {
            var lesson = new Lesson
            {
                titelLesson = dto.TitelLesson,
                dateLesson = dto.DateLesson,
                RecordingLink = dto.RecordingLink != null ? new Uri(dto.RecordingLink) : null,
                Summary = dto.Summary,
                Transcript = dto.Transcript
            };
            await _lessonRepository.UpdateItem(id, lesson);
        }
        //public async Task<LessonDto> AddRecordingAndTranscribeAsync(int lessonId, Uri videoLink)
        //{
        //    var lesson = await _lessonRepository.GetById(lessonId);
        //    if (lesson == null) return null;

        //    // 2️⃣ שמירת הקישור לסרטה
        //    lesson.RecordingLink = videoLink;

        //    // 3️⃣ חלץ אודיו מהסרטה ישירות בתוך הפונקציה
        //    string audioPath = Path.ChangeExtension(videoLink.LocalPath, ".mp3");

        //    var process = new Process
        //    {
        //        StartInfo = new ProcessStartInfo
        //        {
        //            FileName = "ffmpeg", // צריך להיות מותקן במערכת
        //            Arguments = $"-i \"{videoLink.LocalPath}\" -q:a 0 -map a \"{audioPath}\" -y",
        //            RedirectStandardOutput = true,
        //            RedirectStandardError = true,
        //            UseShellExecute = false,
        //            CreateNoWindow = true
        //        }
        //    };

        //    process.Start();
        //    await process.WaitForExitAsync();

        //    // 4️⃣ תמלול באמצעות AI
        //    lesson.Transcript = await _transcriptionService.TranscribeAsync(new Uri(audioPath));

        //    // 5️⃣ סיכום השיעור באמצעות AI
        //    lesson.Summary = await _transcriptionService.SummarizeAsync(lesson.Transcript);

        //    // 6️⃣ עדכון ה‑DB
        //    await _lessonRepository.UpdateItem(lessonId, lesson);

        //    // 7️⃣ החזרת DTO ממופה ל‑LessonDto
        //    return _mapper.Map<LessonDto>(lesson);
        //}
        public async Task<bool> CreateLesson(LessonDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            Console.WriteLine($"dto received: classId={dto.classId}, teacher={dto.TeacherId}, title={dto.titelLesson}");

            var lessonEntity = new Lesson
            {
                ClassRoomId = dto.classId,
                TeacherId = dto.TeacherId,
                titelLesson = dto.titelLesson,
                dateLesson = dto.Date,
                Summary = dto.Summary,
                LessonCategoryId = dto.LessonCategoryId, 
                RecordingLink = Uri.TryCreate(dto.RecordingLink, UriKind.Absolute, out var uri) ? uri : null
            };

            Console.WriteLine($"lessonEntity is null? {lessonEntity == null}"); // ← חייב להיות False

            await _lessonRepository.AddItem(lessonEntity);
            return true;
        }

        public async Task<bool> DeleteLesson(int id)
        {
            var delLes = await _lessonRepository.GetById(id);
            if (delLes == null) return false;
            await _lessonRepository.DeleteItem(id);
            return true;
        }
        public async Task<LessonDto> GetLessonById(int id)
        {
            var exitingLesson = await _lessonRepository.GetById(id);
            if (exitingLesson == null)
            {
                return null;
            }
            var less = _mapper.Map<LessonDto>(exitingLesson);
            return less;

        }
        public async Task<List<LessonDto>> GetLessonsByLessonCategory(int categoryId)
        {
            var exitingLesson = await _lessonRepository.GetLessonByIdLessonCategory(categoryId);
            if (exitingLesson == null || !exitingLesson.Any())
                return new List<LessonDto>();
            var lessons = _mapper.Map<List<LessonDto>>(exitingLesson);
            return lessons;
        }

    }
}


