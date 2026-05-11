using Repositories.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class ClassDetailDto
    {
        
        //public List<Student> Students { get; set; }
        ////רשימת כל השיעורים של הכיתה
     
        //כאשר המשתמש בוחר כיתה ורוצה לראות את השיעורים שבה:
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public List<CreateLessonDto> LessonCategories { get; set; }
        public List<LessonDto> Lessons { get; set; }   // רשימת שיעורים בכיתה
        public List<StudentDto> students { get; set; }
        public int? StudentCount { get; set; } // חישוב של כמות התלמידים במקום הרשימה עצמה
    }
}
