using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.Helpers
{
    public class RolesHelper
    {
        // based on: https://stackoverflow.com/questions/42471866/how-to-create-roles-in-asp-net-core-and-assign-them-to-users
        // todo: add proper identity seed
        public static void CreateRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<PortfolioRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<PortfolioUser>>();
            
            string adminRole = "Administrator";

            var roleExist =  RoleManager.RoleExistsAsync(adminRole);
            roleExist.Wait();
            if (!roleExist.Result)
            {
                RoleManager.CreateAsync(new PortfolioRole() { Name = adminRole }).Wait();
            }

            // creating a super admin user
            var superuser = new PortfolioUser

            {
                UserName = "admin",
                Name = "Admin Endre",
                Active = true,
                Description = "Your friendly neightborhood admin"
            };
     
            string userPWD = "Admin123?";

            var _user = UserManager.FindByNameAsync(superuser.UserName);
            _user.Wait();

            if (_user.Result == null)
            {
                var createResult = UserManager.CreateAsync(superuser, userPWD);
                createResult.Wait();
                if (createResult.Result.Succeeded)
                {
                   UserManager.AddToRoleAsync(superuser, "Administrator").Wait();
                }
            }
        }
    }
}
