using Repositories.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.InterFaces
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetById(int id);

         Task<T> AddItem(T item);

        Task UpdateItem(int id, T item);

        Task DeleteItem(int id);
    }
}
