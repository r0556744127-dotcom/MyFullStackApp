using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class UpdateGradeDto
    {
        //✔ ברור שהפעולה היא רק עדכון ציון

        public int Grade { get; set; }
        public string? TeacherComment { get; set; } // ה-? הופך את השדה לאופציונלי

    }
}
