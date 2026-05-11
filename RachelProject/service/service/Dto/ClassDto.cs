using Repositories.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class ClassDto
    {
        //מייצג כיתה
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
