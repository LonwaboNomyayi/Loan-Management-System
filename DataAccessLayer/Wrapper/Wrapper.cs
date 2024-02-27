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

        public ICustomer Customer { get => customer; set => _ = customer; }
    }
}
