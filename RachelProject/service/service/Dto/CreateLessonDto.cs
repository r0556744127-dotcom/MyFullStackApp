using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class CreateLessonDto
    {
        public string lessonName { get; set; }
        public int classId { get; set; }
        public int TeacherId { get; set; }

        public int Id { get; set; }


    }
}
