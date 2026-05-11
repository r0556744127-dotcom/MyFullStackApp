using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public class Submission
    {
        public int Id { get; set; }
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; }
        //המטלה שהוגשה
        public Assignment Assignment { get; set; }
        //קובץ ההגשה.
        public string FilePath { get; set; }
        //תאריך ושעה של ההגשה
        public DateTime SubmittedAt { get; set; }
        //הציון שניתן
        public int? Grade { get; set; }
        // הערות של המורה על ההגשה.
        public string? TeacherComment { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}

