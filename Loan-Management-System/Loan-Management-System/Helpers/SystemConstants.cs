using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Loan_Management_System.Helpers
{
    public static class SystemConstants
    {
        public static int LoanStatus_Active { get; set; } = 1;
        public static int LoanStatus_Paid { get; set; } = 2;
        public static int LoanStatus_Default { get; set; } = 3;
        
        public static int Base_Loan_Type { get; set; } = 1;
        public static int Collection_Loan_Type { get; set; } = 2;
    }
}