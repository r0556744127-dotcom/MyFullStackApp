using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
//    ✅ 2️⃣ מורה רואה הגשות ונותנת ציון
//👩‍🏫 TeacherSubmissionDto

//המורה צריכה לראות:

//מי הגיש

//איזה מטלה

//קובץ

//תאריך

//ציון(כדי לדעת אם כבר ניתן)
    public class TeacherSubmissionDto
    {
        public int SubmissionId { get; set; }

        public string StudentName { get; set; }

        public string AssignmentTitle { get; set; }

        public DateTime SubmittedAt { get; set; }

        public string FilePath { get; set; }

        public int? Grade { get; set; }
    }
}
