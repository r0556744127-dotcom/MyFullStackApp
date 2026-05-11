using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class StudentSubmissionDto
    {
        //תלמיד רואה את ההגשה שלו + ציון
        public int SubmissionId { get; set; }

        public string AssignmentTitle { get; set; }

        public DateTime SubmittedAt { get; set; }

        public int? Grade { get; set; }
        public string? TeacherComment { get; set; }

        public string StudentName { get; set; }

        public string FilePath { get; set; }


    }
}
