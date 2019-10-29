using Portfolio.Data;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.DataAccess.Implementations
{
    public class UserDao : DaoBase<PortfolioContext, PortfolioUser>, IRepository<PortfolioUser>
    {
        public UserDao(PortfolioContext context)
            :base(context)
        {
        }
    }
}
