﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DemoRaffleApplication.Models
{  [Serializable]
    [Table("RfScheme")]
    public class RfScheme
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string SchemeName { get; set; }
        
        public string Description { get; set; }
        public string UserMarkets { get; set; }

        public string UserIndicators { get; set; }
    }
}
