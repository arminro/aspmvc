using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Data.Interfaces
{
    // in truly decoupled applications, this would be in the webapp, and mapping would bemade between webapp daos and data models
    public interface IDbEntry
    {
        Guid Id { get; set; }
    }
}
