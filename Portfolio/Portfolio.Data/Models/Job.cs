using NodaTime;
using Portfolio.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Portfolio.Data.Models
{
    public partial class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [StringLength(30)]
        [Required]
        public string Employer { get; set; }

        [StringLength(30)]
        [Required]
        public string Position { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [StringLength(200)]
        [Required]
        public string Description { get; set; }

        [Required]
        public bool Active { get; set; } = true;
    }

    public partial class Job : IDbEntry, ILogicallyDeletable
    {
    }
}
