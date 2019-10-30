﻿using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Interfaces;
using PortfolioWeb.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.DataAccess.Implementations
{
    public abstract class DaoBase<TDbCtx, T> : IRepository<T>, IDisposable
        where TDbCtx : DbContext
        where T : class, IDbEntry, ILogicallyDeletable
    {
        private TDbCtx _context;

        public DaoBase(TDbCtx context)
        {
            _context = context;
        }

        public async Task CreateAsync(T newEntry)
        {
            if (await EntryFinderAsync(newEntry.Id) != null)
            {
                throw new ApplicationException($"The {typeof(T).Name} element with the same ID is already in the database");
            }

            await _context.Set<T>().AddAsync(newEntry);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T deletee)
        {
            T element = await EntryFinderAsync(deletee.Id);
            if (element != null)
            {
                // _context.Remove(deletee);
                _context.Entry(element).State = EntityState.Modified;
                element.Active = false;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ApplicationException($"There was an error during deleting the {typeof(T).Name} instance");
            }
        }

        public async Task<T> GetElementAsync(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetElementsAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task UpdateAsync(T updatee)
        {
            T element = await EntryFinderAsync(updatee.Id);
            
            if (element != null)
            {
                _context.Entry(element).State = EntityState.Detached;
                _context.Update(updatee);
                
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ApplicationException($"An error occured during updating the {typeof(T).Name} instance");
            }
        }

        private async Task<T> EntryFinderAsync(Guid id)
        {
            return (T)await _context.Set<T>().FindAsync(id);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
