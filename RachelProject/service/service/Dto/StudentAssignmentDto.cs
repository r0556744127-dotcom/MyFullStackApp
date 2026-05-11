using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class StudentAssignmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        //תאריך אחרון להגשה
        public DateTime DueDate { get; set; }
        //public bool IsSubmitted { get; set; }
        public double? MyGrade { get; set; }
        public string FilePath { get; set; }

    }
}
