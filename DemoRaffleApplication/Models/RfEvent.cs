using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DemoRaffleApplication.Models
{
    public class RfContext : DbContext
    {
        public RfContext()
            : base("DefaultConnection")
        {
        }

       
        public DbSet<RfEvent> RfEvents { get; set; }

        public DbSet<RfScheme> RfSchemes { get; set; }
    }

    [Serializable]
    [Table("RfEvent")]
    public class RfEvent
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public string EventLocation { get; set; }
        public string EventDescription { get; set; }
    }
}