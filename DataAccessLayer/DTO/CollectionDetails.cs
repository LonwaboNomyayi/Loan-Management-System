﻿using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class CollectionDetails : LoanDetails
    {
        public String CustomerFullNames { get; set; }
    }
}
