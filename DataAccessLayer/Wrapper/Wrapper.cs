using DataAccessLayer.Contracts;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Wrapper
{
    public class Wrapper : IWrapper
    {
        private readonly ICustomer customer = new Customer();

        private readonly ILoan loan = new Loan();

        public ICustomer Customer { get => customer; set => _ = customer; }
        public ILoan Loan { get => loan; set => _ = loan; }
    }
}
