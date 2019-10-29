using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Data.Interfaces
{
    public interface ILogicallyDeletable
    {
        bool Active { get; set; }
    }
}
