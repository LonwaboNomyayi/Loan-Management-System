using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class LoanDetailsDTO
    {
        public int LoanId { get; set; }
        public string PaidAmount { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool FullPayment { get; set; }
        public double RemainingPayment { get; set; }
        public int LoanStatus { get; set; }
    }
}
