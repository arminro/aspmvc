using Portfolio.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Portfolio.Data.Models
{
    public partial class PortfolioUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        
        [Required]
        public bool Active { get; set; } = true;

        ICollection<Job> Jobs { get; set; }
        ICollection<Skill> Skills { get; set; }
    }

    public partial class PortfolioUser : IDbEntry, ILogicallyDeletable
    {
    }
}
