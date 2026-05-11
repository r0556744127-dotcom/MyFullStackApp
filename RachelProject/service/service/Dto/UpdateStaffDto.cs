using Repositories.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Dto
{
    public class UpdateStaffDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public StaffRole Role { get; set; }
    }
}
