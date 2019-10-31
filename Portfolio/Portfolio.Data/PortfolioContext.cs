using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Data
{
    public class PortfolioContext : IdentityDbContext<PortfolioUser, PortfolioRole, Guid>
    {
        public PortfolioContext(DbContextOptions<PortfolioContext> opts)
            :base(opts)
        {
        }

        public DbSet<Job> Job { get; set; }
        public DbSet<Skill> Skills { get; set; }
    }
}
