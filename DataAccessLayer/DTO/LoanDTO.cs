using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class LoanDTO
    {
        public int LoanID { get; set; }
        public string LoanDate { get; set; }
        public string LoanHolder { get; set; }
        public double LoanAmount { get; set; }
        public string ReturnDate { get; set; }
        public double ReturnAmount { get; set; }
        public double InterestCharged { get; set; }
    }
}
