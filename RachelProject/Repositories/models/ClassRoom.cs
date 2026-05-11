using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public class ClassRoom 
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        //רשימת תלמידי הכיתה
        public List<Student> Students { get; set; }
        //רשימת כל השיעורים של הכיתה
        public List<LessonCategory> LessonCategories { get; set; }
        // ✅ חדש
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}
