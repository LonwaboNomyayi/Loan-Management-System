using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Loan_Management_System.Helpers
{
    public class SystemConstants
    {
        public int LoanStatus_Active { get; set; } = 1;
        public int LoanStatus_Paid { get; set; } = 2;
        public int LoanStatus_Default { get; set; } = 3;
    }
}