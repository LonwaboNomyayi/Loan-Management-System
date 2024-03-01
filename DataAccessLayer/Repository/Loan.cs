using DataAccessLayer.Contracts;
using DataAccessLayer.DTO;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class Loan : ILoan
    {
         
        public async Task<List<LoanDTO>> GetAllLoansForStore(int StoreKey)
        {
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@StoreKey", StoreKey) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery("SP_GetAllLoansForStore", parameters));

				List<LoanDTO> loans = new List<LoanDTO>();

				foreach (DataRow row in dt.Rows)
				{
					loans.Add(
						new LoanDTO
						{
							LoanID = (int)row["Loan_Key"],
							LoanDate = DateTime.Parse(row["Loan_Date"].ToString().Trim()).ToShortDateString(),
							LoanHolder = row["Loan_Customer_Name"].ToString().Trim(),
							LoanAmount = double.Parse(row["Loan_Amount"].ToString().Trim()),
							ReturnDate = DateTime.Parse(row["Loan_Return_Date"].ToString().Trim()).ToShortDateString(),
							ReturnAmount = double.Parse(row["Loan_Return_Amount"].ToString().Trim()),
							InterestCharged = double.Parse(row["Loan_Interest"].ToString().Trim())
						});
				}
				return loans;
			}
			catch (SqlException ex)
			{
				//ex.Logger();
				return null;
			}
		}


		public async Task<LoanDetails> GetLoanByKey(int Id)
        {
            try
            {
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@LoanId", Id) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery(("SP_GetLoanByKey"), parameters));
				
				if (dt.Rows.Count > 0)
                {
					return new LoanDetails
					{
						LoanKey = (int)dt.Rows[0]["Loan_Key"],
						LoanDate = DateTime.Parse(dt.Rows[0]["Loan_Date"].ToString().Trim()).ToShortDateString(),
						LoanAmount = double.Parse(dt.Rows[0]["Loan_Amount"].ToString().Trim()),
						LoanInterest = double.Parse(dt.Rows[0]["Loan_Interest"].ToString().Trim()),
						LoanReturnDate = DateTime.Parse(dt.Rows[0]["Loan_Return_Date"].ToString().Trim()).ToShortDateString(),
						ReturnAmount = double.Parse(dt.Rows[0]["Loan_Return_Amount"].ToString().Trim()),
						LoanStatus = (int)dt.Rows[0]["Loan_Status"],
						LoanStore = (int)dt.Rows[0]["Loan_Store"],
						LoanCustomerKey = (int)dt.Rows[0]["Loan_Customer_Key"],
					};

				}

            }
			catch(Exception ex)
            {
				//Log ex
            }
			return null;
        }

		public async Task<List<LoanStatus>> GetLoanStatuses()
        {
            try
            {
				DataTable dt = await Task.Run(() => DbContext.GetSelectQuery("SP_GetLoanStatuses"));

				var loanStatuses = new List<LoanStatus>();

                foreach (DataRow row in dt.Rows)
                {
					var loanStatus = new LoanStatus
					{
						LoanStatusId = (int)row["loan_Status_Key"],
						LoanStatusDesc = row["loan_Status_Desc"].ToString().Trim()
					};
					loanStatuses.Add(loanStatus);
                }
				return loanStatuses;

			}
			catch(Exception ex)
            {

            }
			return null;
        }
    }
}
