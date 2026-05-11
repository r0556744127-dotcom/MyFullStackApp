using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public class Student:User
    {
        public int ClassRoomId { get; set; }
        //הכיתה שבה היא רשומה
        public ClassRoom ClassRoom { get; set; }

        // ההיסטוריה של המטלות והציונים
        public List<Submission>? Submissions { get; set; }
       

    }
}
