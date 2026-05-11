using Repositories.models;

namespace service.Dto
{
    public class CreateStaffDto
    {
        public string FullName { get; set; }
        public string password { get; set; }
        public string IdentityNumber { get; set; }
        public string email { get; set; } 
        public int Id { get; set; }
        public StaffRole Role { get; set; }
        public List<ClassDto> Classes { get; set; }
        public List<LessonDto> Lessons { get; set; }
    }
}

