using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Data.Interfaces;
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
        where TEntity : class, IDbEntry, ILogicallyDeletable
    {
        protected IRepository<TEntity> _repository;
        public ApiControllerBase(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        // GET api/[entities]
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            try
            {
                // an empty list is still ok
                return Ok(await _repository.GetElementsAsync());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not retrieve list of ${nameof(TEntity)}");
            }

        }

        // GET api/[entities]/5555-5555-5555-5555
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> Get(Guid id)
        {
            try
            {
                var entity = await _repository.GetElementAsync(id);
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
                    $"Could not retrieve element ${nameof(TEntity)}");
            }
        }

        // POST api/[entities]
        [HttpPost]
        public virtual async Task<ActionResult> Post([FromBody] TEntity value)
        {
            try
            {
                await _repository.CreateAsync(value);
                return Accepted(); // usually, Created() is used, but my repo does not return anything
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not create element ${nameof(TEntity)}");
            }
        }

        // PUT api/[entities]/5555-5555-5555
        [HttpPut("{id}")]
        public virtual async Task<ActionResult> Put(int id, [FromBody] TEntity value)
        {
            try
            {
                await _repository.UpdateAsync(value);
                return Accepted(); 
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not update element ${nameof(TEntity)}");
            }
        }

        // DELETE api/[entities]/5555-5555-5555
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var entity = await _repository.GetElementAsync(id);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    await _repository.DeleteAsync(entity);
                    return Ok(entity);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not delete element ${nameof(TEntity)}");
            }
        }
    }
}
