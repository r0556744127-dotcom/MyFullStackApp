using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class StudentDto:UserDto
    {
        public string studentName { get; set; }//שם תלמיד
        public double? AttendanceRate { get; set; } //אחוז נוכחות
        public double? AverageGrade { get; set; }//ממוצע ציונים
        public string? LastLessonTitle { get; set; } // שם השיעור האחרון
    }
}
