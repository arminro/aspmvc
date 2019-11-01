using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Portfolio.Data.Models;
using PortfolioWeb.Helpers;
using PortfolioWeb.Security;
using PortfolioWeb.ViewModels;

namespace PortfolioWeb.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<PortfolioUser> _userManager;
        private readonly SignInManager<PortfolioUser> _signInManager;
        private readonly RoleManager<PortfolioRole> _roleManager;
        private readonly AppSettings _appsettings;
        ITokenService _tokenService;

        public AccountController(UserManager<PortfolioUser> userManager,
            SignInManager<PortfolioUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }


        [HttpPost]
        [Route("api/[controller]/register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel viewModel)
        {
            try
            {
                PortfolioUser user = await _userManager.FindByNameAsync(viewModel.Username);
                if(user != null)
                {
                    return Conflict("The specified user alreaedy exist");
                }
                user = new PortfolioUser();
                // a more approriate way would be to configure a mapping in Automapper
                user.Name = viewModel.Name;
                user.UserName = viewModel.Username;
                user.Description = viewModel.Description;

                var result = await _userManager.CreateAsync(user, viewModel.Password);
                if (!result.Succeeded)
                {
                    return Unauthorized(result);
                }
                await _signInManager.PasswordSignInAsync(user, viewModel.Password, false, false);
                return Ok(_tokenService.GenerateToken(user.Id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Could not register user {viewModel.Username}");
            }
        }

        [HttpPost]
        [Route("api/[controller]/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel viewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userInDb = await _userManager.FindByNameAsync(viewModel.Username);
                    if (userInDb == null)
                    {
                        return NotFound($"The user with the username \"${viewModel.Username}\" is not registered");
                    }
                    var signInResult = await _signInManager.PasswordSignInAsync(viewModel.Username, viewModel.Password, false, false);
                    if (signInResult.Succeeded)
                    {
                        return Ok(_tokenService.GenerateToken(userInDb.Id));
                    }
                    return Unauthorized();
                }
                return BadRequest();
            }
            catch
            {
                   return StatusCode(StatusCodes.Status500InternalServerError,
                        $"Unexpectedf error during login of user {viewModel.Username}");
            }
        }

        [HttpPost]
        [Route("api/[controller]/logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Unexpectedf error during logging out");
            }
        }
    }
}