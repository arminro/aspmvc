using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("Cors")]
    public class ApiControllerBase<TEntity> : ControllerBase
        where TEntity : class, IDbEntry, ILogicallyDeletable, IEntityChild
    {
        protected readonly IRepository<TEntity> _repository;
        protected readonly UserManager<PortfolioUser> _userManager;
        protected readonly RoleManager<PortfolioRole> _roleManager;

        public ApiControllerBase(IRepository<TEntity> repository,
            UserManager<PortfolioUser> userManager, RoleManager<PortfolioRole> roleManager)
        {
            _repository = repository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // GET api/[entities]
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            try
            {
                var result = await _repository.GetElementsAsync(await IsUserAdmin(),
                    GetUserIdFromJWT());
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
                var entity = await _repository.GetElementAsync(elementId, await IsUserAdmin());
                if (entity == null)
                {
                    return NotFound("The requested element is not available.");
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
                        var inDb = await _repository.GetElementAsync(value.Id, await IsUserAdmin());
                        if (inDb.UserId != value.UserId)
                            return Forbid($"The user is not the original owner of the entity {value.GetType().Name}");

                        await _repository.UpdateAsync(value);
                        return Accepted();
                    }
                    return Unauthorized("The user is not authorized to perform the requested operation.");
                    
                }
                return BadRequest(ModelState);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not update element ${value.GetType().Name}");
            }
        }

        // DELETE api/[entities]/5555-5555-5555
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(Guid id, [FromHeader] Guid ownerId)
        {
            try
            {
                var entity = await _repository.GetElementAsync(id, await IsUserAdmin());
                if (entity == null)
                {
                    return NotFound("The user to be deleted is not found in the databse");
                }
                else
                {
                    if(await LoggedInUserAuthorizedToPerformAction(ownerId))
                    {
                        await _repository.DeleteAsync(entity, await IsUserAdmin());
                        return Ok(entity);
                    }
                    return Unauthorized($"The user is not authorized to perform the requested operation.");                    
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not delete element");
            }
        }

        protected async Task<bool> LoggedInUserAuthorizedToPerformAction(Guid authorOfResource)
        {
            // no null check is needed, since [Authorize] would not let the flow here w/o a valid JWT
            // JWT has a pre-agreed schema which includes the user id, so this should always work by design (unless MS renames aud)
            Guid id = GetUserIdFromJWT();

            // authorized is admin or loggedin and owns the resource
            return await IsUserAdmin() || id == authorOfResource;
        }

        private Guid GetUserIdFromJWT()
        {
            return Guid.Parse(User.Claims.FirstOrDefault(e => e.Type == "aud").Value);
        }

        private async Task<bool> IsUserAdmin()
        {
            var roleId = Guid.Parse(User.Claims.FirstOrDefault(e => e.Type == "role").Value);
            var adminId = (await _roleManager.FindByNameAsync(Constants.ADMIN_ROLE))?.Id;
            return roleId == adminId;
        }
    }
}
