using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Interfaces;

namespace PortfolioWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ApiControllerBase<Job>
    {
        public JobsController(IRepository<Job> repository, UserManager<PortfolioUser> userManager, RoleManager<PortfolioRole> roleManager)
            :base(repository, userManager, roleManager)
        {
        }
    }
}
