using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class LoanDetails
    {
        public int LoanKey { get; set; }
        public DateTime LoanDate { get; set; }
        public double LoanAmount { get; set; }
        public double LoanInterest { get; set; }
        public DateTime LoanReturnDate { get; set; }
        public int LoanStatus { get; set; }
        public int LoanStore { get; set; }
        public int Loan_Customer_Key { get; set; }
    }
}
