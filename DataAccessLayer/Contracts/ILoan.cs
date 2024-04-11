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
        Task<bool> RegisterLoan(LoanDetails loanDetais);
        Task<bool> UpdateLoanPayment(LoanDetailsDTO loanDetails);
        Task<bool> DefaultLoan(LoanDetailsDTO loanDetails);
        Task<List<StatementDTO>> GetLoanStatements(int LoanId);
        Task<LoanTotalDTO> GetLoanTotalsForCurrentMonthAsync(int Branch);
        Task<List<LoanLineGraphDTO>> GetLineGraphInfo();
        Task<List<LoanDTO>> GetAllCollectionsForStore(int StoreKey, int month);
        Task<bool> IsLoanDefault(int loanId);
        Task<bool> RegisterPaymentForDefaultLoan(LoanDetailsDTO collection);
    }
}
