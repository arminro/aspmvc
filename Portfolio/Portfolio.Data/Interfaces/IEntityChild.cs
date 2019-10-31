using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Data.Interfaces
{
    public interface IEntityChild
    {
        Guid UserId { get; set; }
    }
}
