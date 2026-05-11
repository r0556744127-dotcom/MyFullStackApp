using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class UserDto
    {
        //לכניסה למשתמש וכן מחלקות יורשות ממנו כי הוא מחלקת בסיס
        public int Id { get; set; }
        public string password { get; set; }
        public string FullName { get; set; }
        public int Role { get; set; }
    }
}
