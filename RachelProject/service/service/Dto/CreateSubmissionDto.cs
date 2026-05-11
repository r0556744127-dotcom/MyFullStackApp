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
  //מה קורה בשרת:

//    מזהים את התלמיד מה־User המחובר

//שומרים את הקובץ

//יוצרים Submission

//קובעים SubmittedAt

//Grade = null
    //תלמיד מגיש מטלה
    public class CreateSubmissionDto
    {
      
        public int StudentId { get; set; }
        public int AssignmentId { get; set; }
        public IFormFile File { get; set; }

    }
}
