using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PortfolioWeb.Helpers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioWeb.Security
{
    public class JWTProvider : ITokenService
    {
        IOptions<AppSettings> _appSettings;
        public JWTProvider(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings;
        }
        public string GenerateToken(Guid userId, string roleId)
        {
            // based on: https://jasonwatmore.com/post/2018/08/14/aspnet-core-21-jwt-authentication-tutorial-with-example-api
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userId.ToString()),
                    new Claim(ClaimTypes.Role, roleId)
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                IssuedAt = DateTime.UtcNow,
                
                Audience = userId.ToString() // indicate that the audience will be the user and only the user
                
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
