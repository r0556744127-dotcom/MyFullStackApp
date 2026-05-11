using Microsoft.AspNetCore.Http;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class CreateAssignmentDto
    {
        public int Id { get; set; }    // קוד מטלה
        public string? AssignmentName { get; set; }    // שם המטלה
        public int ClassId { get; set; }           // הכיתה שאליה היא שייכת
        public IFormFile File { get; set; }           // הקובץ שהמורה מעלה
        public DateTime DueDate { get; set; }
        public string Title { get; set; }
        public int? LessonId { get; set; }   // טוב למסד נתונים
    }
}
