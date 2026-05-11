//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Design;
//using codeFirst.models; // זה התיקון הקריטי!

//namespace Repositories.Repositories
//{
//    public class DesignContextFactory : IDesignTimeDbContextFactory<School>
//    {
//        public School CreateDbContext(string[] args)
//        {
//            var optionsBuilder = new DbContextOptionsBuilder<School>();

//            // השתמשתי בשרת שמופיע אצלך בקוד (server=.)
//            optionsBuilder.UseSqlServer("server=.;database=School_Racheli;trusted_connection=true;TrustServerCertificate=true");

//            return new School(optionsBuilder.Options);
//        }
//    }
//}