using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class LoanLineGraphDTO
    {
        public int MonthIndex { get; set; }
        public double CreditFacilitiesPerMonth { get; set; }  
        public double ReturnedLoanTotalPerMonth { get; set; }
        public double LoanReceivedInterestPerMonth { get; set; }
        public double TotalLossRatio { get; set; }
    }
}
