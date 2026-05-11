using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace service.Dto
{
    public class CreateStudentDto
    {
        public string FullName { get; set; }

        // זה השדה שיוזן לתוך ה-User.IdentityNumber ב-DB
        public string IdentityNumber { get; set; }

        public string password { get; set; }

        public int studentId { get; set; } // 0 ב-POST (Identity)

        public int ClassRoomId { get; set; }

        public string email { get; set; }
    }
}
