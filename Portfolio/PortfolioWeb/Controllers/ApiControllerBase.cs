using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data.Interfaces;
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

        // GET api/[entities]/admin
        [HttpGet]
        [Authorize(Roles ="Administrator")]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            try
            {
                // only the admin can see everything
                return Ok(await _repository.GetElementsAsync(User.IsInRole("Adminstrator")));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve list of ${nameof(TEntity)}");
            }
        }

        // GET api/[entities]
        [HttpGet]
        [Authorize]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> Get([FromBody] Guid ownerid)
        {
            try
            {
                if (!await LoggedInUserAuthorizedToPerformAction(ownerid))
                    return Unauthorized();
                
                return Ok((await _repository.GetElementsAsync(User.IsInRole("Adminstrator")))?.Where(e=>e.UserId == ownerid));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve list of ${nameof(TEntity)}");
            }
        }


        // GET api/[entities]/5555-5555-5555-5555
        [HttpGet("{id}")]
        [Authorize]
        public virtual async Task<ActionResult<TEntity>> Get(Guid elementId, [FromBody] Guid ownerId)
        {
            try
            {
                var entity = await _repository.GetElementAsync(elementId, User.IsInRole("Adminstrator"));
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    // admin can ask for resource belonging to anyone
                    if (await LoggedInUserAuthorizedToPerformAction(ownerId) && entity.UserId == ownerId)
                        return Ok(entity);

                    return Unauthorized();
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve element ${nameof(TEntity)}");
            }
        }

        // POST api/[entities]
        [HttpPost]
        [Authorize]
        public virtual async Task<ActionResult> Post([FromBody] TEntity value)
        {
            try
            {

                value.Active = true;
                value.UserId = await GetLoggedInUserId();
                await _repository.CreateAsync(value);
                return Accepted(); // usually, Created() is used, but my repo does not return anything
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not create element ${value.GetType().Name}");
            }
        }

        // PUT api/[entities]
        [HttpPut("{id}")]
        [Authorize]
        public virtual async Task<ActionResult> Put(Guid ownerId, [FromBody] TEntity value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (await LoggedInUserAuthorizedToPerformAction(ownerId) && value.UserId == ownerId)
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
                    $"Could not update element ${nameof(TEntity)}");
            }
        }

        // DELETE api/[entities]/5555-5555-5555
        [HttpDelete("{id}")]
        [Authorize]
        public virtual async Task<ActionResult> Delete(Guid id, [FromBody] Guid ownerId)
        {
            try
            {
                var entity = await _repository.GetElementAsync(id, User.IsInRole("Adminstrator"));
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    if(await LoggedInUserAuthorizedToPerformAction(ownerId) && entity.UserId == ownerId)
                    {
                        await _repository.DeleteAsync(entity, User.IsInRole("Administrator"));
                        return Ok(entity);
                    }
                    return Unauthorized();
                    
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not delete element ${nameof(TEntity)}");
            }
        }

        protected async Task<bool> LoggedInUserAuthorizedToPerformAction(Guid userId)
        {
            // authorized if admin or loggedin
            return User.IsInRole("Administrator") ||
                (await _userManager.GetUserAsync(HttpContext.User)).Id == userId;
        }

        protected async Task<Guid> GetLoggedInUserId()
        {
            return (await _userManager.GetUserAsync(HttpContext.User)).Id;
        }

    }
}
