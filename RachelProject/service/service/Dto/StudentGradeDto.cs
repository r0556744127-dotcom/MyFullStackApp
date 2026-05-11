using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class StudentGradeDto
    {
        public int AssignmentId { get; set; }
        public int? Grade { get; set; } 
        public string? TeacherComment { get; set; }
    }
}
