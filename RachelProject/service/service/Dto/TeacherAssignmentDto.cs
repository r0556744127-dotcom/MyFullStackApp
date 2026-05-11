using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class TeacherAssignmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string className { get; set; }
        public DateTime DueDate { get; set; }
        public int? LessonId { get; set; }
        public string status { get; set; }//מתי הוגש לפני הזמן בזמן או אחרי הזמן
        public int? TotalSubmissions { get; set; }//סך ההגשות 
        public double? AverageAssignment { get; set; }


    }
}
