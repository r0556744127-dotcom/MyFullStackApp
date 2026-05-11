using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface Iservice<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);

        Task<T> AddItem(T item);

        Task UpdateItem(int id, T item);

        Task DeleteItem(int id);
    }
}
