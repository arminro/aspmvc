using Portfolio.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Portfolio.Data.Models
{
    public partial class Skill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string SkillName { get; set; }

        [MaxLength(200)]
        [Required]
        public string SkillDescription { get; set; }

        [Required]
        public bool Active { get; set; } = true;

        [Required]
        public Guid UserId { get; set; }
    }

    public partial class Skill : IDbEntry, ILogicallyDeletable, IEntityChild
    {
    }
}
