using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public class Lesson
    {
        public int? LessonCategoryId { get; set; }
        public LessonCategory LessonCategory { get; set; }
        public DateTime dateLesson { get; set; }
        [Key]
        public int idLesson { get; set; }
        //שם השיעור
        public string titelLesson { get; set;}
        //אפשר להשתמש ב־Uri במקום string, כי זה מייצג כתובת אינטרנט בצורה תקנית:
        public Uri RecordingLink { get; set; }
        //הכיתה שבה מתקיים השיעור
        public ClassRoom ClassRoom { get; set; }
        [ForeignKey("ClassRoom")]
        public int ClassRoomId { get; set; }
        // מורה
        public int TeacherId { get; set; }
        //המורה שמלמשת את השיעור
        public Staff Teacher { get; set; }
        //רשימת כל המטלות שקשוריםלשיעור זה
        public List<Assignment> Assignments { get; set; }
        public string? Transcript { get; set; }
        public string? Summary { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }

    }
}
