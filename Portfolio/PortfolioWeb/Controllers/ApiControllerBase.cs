using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data.Interfaces;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Interfaces;
using PortfolioWeb.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApiControllerBase<TEntity> : ControllerBase
        where TEntity : class, IDbEntry, ILogicallyDeletable, IEntityChild
    {
        protected IRepository<TEntity> _repository;
        protected UserManager<PortfolioUser> _userManager;

        public ApiControllerBase(IRepository<TEntity> repository, UserManager<PortfolioUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        // GET api/[entities]
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            try
            {
                var result = await _repository.GetElementsAsync(User.IsInRole(Constants.ADMIN_ROLE));
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve list of ${nameof(TEntity)}");
            }
        }


        // GET api/[entities]/5555-5555-5555-5555
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> Get(Guid elementId)
        {
            try
            {
                var entity = await _repository.GetElementAsync(elementId, User.IsInRole(Constants.ADMIN_ROLE));
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(entity);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve the element");
            }
        }

        // POST api/[entities]
        [HttpPost]
        public virtual async Task<ActionResult> Post([FromBody] TEntity value)
        {
            try
            {
                if (await LoggedInUserAuthorizedToPerformAction(value.UserId))
                {
                    value.Active = true;
                    await _repository.CreateAsync(value);
                    return Accepted(); // usually, Created() is used, but my repo does not return anything
                }
                return Unauthorized();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not create element ${value.GetType().Name}");
            }
        }

        // PUT api/[entities]
        [HttpPut]
        public virtual async Task<ActionResult> Put([FromBody] TEntity value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (await LoggedInUserAuthorizedToPerformAction(value.UserId))
                    {
                        await _repository.UpdateAsync(value);
                        return Accepted();
                    }
                    return Unauthorized();
                    
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not update element ${value.GetType().Name}");
            }
        }

        // DELETE api/[entities]
        [HttpDelete]
        public virtual async Task<ActionResult> Delete([FromHeader] TEntity value)
        {
            try
            {
                var entity = await _repository.GetElementAsync(value.Id, User.IsInRole(Constants.ADMIN_ROLE));
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    if(await LoggedInUserAuthorizedToPerformAction(value.UserId))
                    {
                        await _repository.DeleteAsync(entity, User.IsInRole(Constants.ADMIN_ROLE));
                        return Ok(entity);
                    }
                    return Unauthorized();                    
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not delete element ${value?.GetType().Name}");
            }
        }

        protected async Task<bool> LoggedInUserAuthorizedToPerformAction(Guid userId)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            // authorized is admin or loggedin
            return User.IsInRole(Constants.ADMIN_ROLE) ||
                user.Id == userId;
        }
    }
}
