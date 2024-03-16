using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class StatementDTO
    {
        public string TransactionDate { get; set; }
        public string TransactionDescription { get; set; }
        public double TransactionAmount { get; set; }
        public double TransactionBalance { get; set; }
    }
}
