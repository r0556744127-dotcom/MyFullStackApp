using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class UpdateLessonDto
    {
        public string TitelLesson { get; set; }
        public DateTime DateLesson { get; set; }
        public string? RecordingLink { get; set; }
        public string? Summary { get; set; }
        public string? Transcript { get; set; }
    }
}
