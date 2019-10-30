using Portfolio.Data;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.DataAccess.Implementations
{
    public class SkillDao : DaoBase<PortfolioContext, Skill>, IRepository<Skill>
    {
        public SkillDao(PortfolioContext context)
            : base(context)
        {
        }
    }
}
