using DataAccessLayer.DTO;
using DataAccessLayer.Models;
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
        Task<LoanDetails> GetLoanByKey(int Id);
        Task<List<LoanStatus>> GetLoanStatuses();
    }
}
