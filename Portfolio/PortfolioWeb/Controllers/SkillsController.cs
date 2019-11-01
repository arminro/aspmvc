using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ApiControllerBase<Skill>
    {
        public SkillsController(IRepository<Skill> repository, UserManager<PortfolioUser> userManager, RoleManager<PortfolioRole> roleManager)
            : base(repository, userManager, roleManager)
        {
        }
    }
}
