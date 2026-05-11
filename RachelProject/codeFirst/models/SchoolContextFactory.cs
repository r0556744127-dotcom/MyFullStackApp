using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace codeFirst.models
{
    public class SchoolContextFactory : IDesignTimeDbContextFactory<School>
    {
        public School CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<School>();
            optionsBuilder.UseSqlServer("server=.;database=School_Racheli;trusted_connection=true;TrustServerCertificate=true");
            return new School(optionsBuilder.Options);
        }
    }
}
