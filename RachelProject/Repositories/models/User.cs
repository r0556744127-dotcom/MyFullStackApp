using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{ 
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string email { get; set; }
        public string Password { get; set; } = null!;
        public bool MustChangePassword { get; set; }
        public string IdentityNumber { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}
