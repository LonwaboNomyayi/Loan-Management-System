﻿using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Contracts
{
    public interface ICustomer
    {
        Task<List<CustomerDetails>> GetAllCustomerDetailsStoreKey(int StoreKey);
    }
}
