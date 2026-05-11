using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public class LessonCategory
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } // שם הקטגוריה, לדוגמה: "Math"
                                         // הכיתה שאליה שייכת הקטגוריה
        public int ClassRoomId { get; set; }
        public ClassRoom ClassRoom { get; set; }
        // רשימת כל השיעורים מהקטגוריה הזו
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}
