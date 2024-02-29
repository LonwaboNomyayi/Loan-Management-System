using DataAccessLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Contracts
{
    public interface ILoan
    {
        Task<List<LoanDTO>> GetAllLoansForStore(int StoreKey);
    }
}
