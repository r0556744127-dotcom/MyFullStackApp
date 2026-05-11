using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    //מטלה
    public class Assignment
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        //תאריך אחרון להגשה 
        public DateTime DueDate { get; set; }
        public string? FilePath { get; set; }
        [ForeignKey("Lesson")]
        public int? LessonId { get; set; }   // טוב למסד נתונים
       //השיעור שהמטלה שייכת אליו
        public Lesson? Lesson { get; set; }
        //רשימת כל ההגשות של תלמידות למטלה זו.
        public List<Submission> Submissions { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }

    }
}
