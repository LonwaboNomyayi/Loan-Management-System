using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class LoanDetails
    {
        public int LoanKey { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public string LoanDate { get; set; }

        public double LoanAmount { get; set; }
        public double LoanInterest { get; set; }
        public string LoanReturnDate { get; set; }
        public double ReturnAmount { get; set; }
        public int LoanStatus { get; set; }
        public int LoanStore { get; set; }
        public int LoanCustomerKey { get; set; }

    }
}
