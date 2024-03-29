using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class LoanTotalDTO
    {
        public double TotalLoanedAmount { get; set; }
        public double TotalReturnAmount { get; set; }
        public double TotalInterest { get; set; }
    }
}
