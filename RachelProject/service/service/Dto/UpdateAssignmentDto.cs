using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class UpdateAssignmentDto
    {
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public IFormFile? NewFile { get; set; }
    }
}
