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
							LoanDate = DateTime.Parse(row["Loan_Date"].ToString().Trim()),
							LoanHolder = row["Loan_Customer_Name"].ToString().Trim(),
							LoanAmount = double.Parse(row["Loan_Amount"].ToString().Trim()),
							ReturnDate = DateTime.Parse(row["Loan_Return_Date"].ToString().Trim()),
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
    }
}
