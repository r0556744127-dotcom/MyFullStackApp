using Microsoft.EntityFrameworkCore;
using Repositories.InterFaces;
using Repositories.models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class StaffRepository : IRepository<Staff>
    {
        private readonly IContext _context;

        public StaffRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Staff> AddItem(Staff item)
        {
            await _context.Staffs.AddAsync(item);
            await _context.SaveAsync();
            return item;
        }
        public async Task UpdateItem(int id, Staff item)
        {
            var staff = await GetById(id);
            if (staff != null)
            {
                staff.FullName = item.FullName;
                staff.email = item.email;
                staff.Role = item.Role;
                await _context.SaveAsync();
            }
        }
    public async Task DeleteItem(int id)
{
    var staff = await _context.Staffs
        .Include(s => s.Lessons)
        .FirstOrDefaultAsync(s => s.Id == id);

    if (staff == null) return;

    var now = DateTime.UtcNow;

    staff.IsDeleted = true;
    staff.DeletedAt = now;

    foreach (var submission in staff.Lessons ?? new List<Lesson>())
    {
        submission.IsDeleted = true;
        submission.DeletedAt = now;
    }

    await _context.SaveAsync();
}

        public Task<List<Staff>> GetAllAsync()
        {
            return _context.Staffs.ToListAsync();
        }

        public async Task<Staff> GetById(int id)
        {
            return await _context.Staffs.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Staff> GetByEmail(string email)
        {
            return await _context.Staffs.FirstOrDefaultAsync(x => x.email == email);
        }
        public async Task<List<ClassRoom>> GetTeacherById(int id)
        {
            var staff = await GetById(id);
            return staff?.Classes ?? new List<ClassRoom>(); // מונע null
        }
        
        public async Task<User> GetByIdentityNumberAsync(string IdentityNumber)
        {
            return await _context.Staffs.FirstOrDefaultAsync(u => u.IdentityNumber.Trim() == IdentityNumber.Trim());
        }
       
        
    }
}