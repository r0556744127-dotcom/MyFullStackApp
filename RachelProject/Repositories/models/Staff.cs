using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.models
{
    public enum StaffRole
    {
        Teacher,
        Admin }
   
    public class Staff:User
    {
        //תפקיד מורה/מנהלת
        public StaffRole Role { get; set; }
        //רשימת כיתות
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
        public List<ClassRoom> Classes { get; set; } = new List<ClassRoom>();



    }
}
