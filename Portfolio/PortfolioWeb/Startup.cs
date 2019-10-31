using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Data;
using Portfolio.Data.Models;
using PortfolioWeb.DataAccess.Implementations;
using PortfolioWeb.DataAccess.Interfaces;
using PortfolioWeb.Helpers;

namespace PortfolioWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            services.AddIdentity<PortfolioUser, PortfolioRole>()
                .AddEntityFrameworkStores<PortfolioContext>()
                .AddRoles<PortfolioRole>();

            services.AddDbContext<PortfolioContext>(builder =>
            {
                builder.UseSqlServer(Configuration["ConnectionStrings"]);
            });

            // DAOs with scoped lifetime to match lifetime of datacontext
            services.AddScoped<IRepository<Job>, JobDao>();
            services.AddScoped<IRepository<Skill>, SkillDao>();
            services.AddScoped<IRepository<PortfolioUser>, UserDao>();

           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
               
              
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
            RolesHelper.CreateRoles(serviceProvider);
        }
    }
}
