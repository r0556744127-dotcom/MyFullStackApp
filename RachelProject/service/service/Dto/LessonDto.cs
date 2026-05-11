using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class LessonDto
    {
        public int idLesson { get; set; }
        public List<CreateAssignmentDto>? Assignments { get; set; }

        public int classId { get; set; }
        public string titelLesson { get; set; }
        public DateTime Date { get; set; }
        public int TeacherId { get; set; }
        public int LessonCategoryId { get; set; } 
        public string? RecordingLink { get; set; }
        public string? RecordingUrl { get; set; }
        public string? Summary { get; set; }
    }
}
