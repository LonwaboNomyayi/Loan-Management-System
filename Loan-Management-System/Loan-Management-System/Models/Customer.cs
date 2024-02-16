using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Loan_Management_System.Models
{
    public class Customer
    {
        public int CustomerKey { get; set; }
        public String CustomerName { get; set; }
        public String CustomerIDNumber { get; set; }
        public int CustomerPayDay { get; set; }
        public double CustomerSalary { get; set; }
        public String CustomerAddress1 { get; set; }
        public String CustomerAddress2 { get; set; }
        public String CustomerAddress3 { get; set; }
        public String CustomerAddress4 { get; set; }
        public String CustomerPostalCde { get; set; }
    }
}