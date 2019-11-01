using Portfolio.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.DataAccess.Interfaces
{
    public interface IRepository<T>
         where T : class, IDbEntry
    {
        Task CreateAsync(T newEntry);

        Task UpdateAsync(T updatee);

        Task<T> GetElementAsync(Guid id, bool isAdmin);

        Task<IEnumerable<T>> GetElementsAsync(bool isAdmin, Guid ownerId);

        Task DeleteAsync(T deletee, bool isAdmin);
    }
}
