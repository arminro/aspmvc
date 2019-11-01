using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioWeb.Security
{
    public interface ITokenService
    {
        string GenerateToken(Guid userId);
    }
}
