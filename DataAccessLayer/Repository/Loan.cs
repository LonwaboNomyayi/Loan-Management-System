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
			catch (Exception ex)
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
			catch (Exception ex)
			{

			}
			return null;
		}


		public async Task<bool> RegisterLoan(LoanDetails loanDetais)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] {
					new SqlParameter("@LoanDate", loanDetais.LoanDate),
					new SqlParameter("@LoanStatus", loanDetais.LoanStatus),
					new SqlParameter("@LoanCustomerKey", loanDetais.LoanCustomerKey),
					new SqlParameter("@LoanAmount", loanDetais.LoanAmount),
					new SqlParameter("@LoanReturnDate", loanDetais.LoanReturnDate),
					new SqlParameter("@ReturnAmount", loanDetais.ReturnAmount),
					new SqlParameter("@LoanInterest", loanDetais.LoanInterest),
					new SqlParameter("@LoanStore", loanDetais.LoanStore)
				};
				return await Task.Run(() => DbContext.ExecuteNonQuery("SP_AddLoan", parameters));
			}
			catch (Exception ex)
			{

			}
			return false;
		}

		public async Task<bool> UpdateLoanPayment(LoanDetailsDTO loanDetails)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] {
					new SqlParameter("@LoanId", loanDetails.LoanId),
					new SqlParameter("@FullPayment", loanDetails.FullPayment),
					new SqlParameter("@PaidAmount", loanDetails.PaidAmount),
					new SqlParameter("@LoanReturnDate", loanDetails.ReturnDate),
					new SqlParameter("@RemainingAmount", loanDetails.RemainingPayment),
					new SqlParameter("@PaymentBeforeSetReturnDate", loanDetails.PaymentBeforeSetReturnDate),
					new SqlParameter("@LoanStatus", loanDetails.LoanStatus)
				};
				return await Task.Run(() => DbContext.ExecuteNonQuery("SP_UpdateLoanPayment", parameters));
			}
			catch (Exception ex)
			{

			}
			return false;
		}

		public async Task<bool> DefaultLoan(LoanDetailsDTO loanDetails)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] {
					new SqlParameter("@LoanId", loanDetails.LoanId),
					new SqlParameter("@LoanStatus", loanDetails.LoanStatus)
				};
				if(await Task.Run(() => DbContext.ExecuteNonQuery("SP_DefaultLoan", parameters)))
				{
					return await ApplyLoanInterest(loanDetails.LoanId);

                }
			}
			catch (Exception ex)
			{

			}
			return false;
		}

		public async Task<List<StatementDTO>> GetLoanStatements(int LoanId)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@LoanId", LoanId) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery(("SP_GetLoanStatements"), parameters));

				var loanStatement = new List<StatementDTO>();

				

				foreach (DataRow row in dt.Rows)
				{
					var transaction = new StatementDTO
					{
						TransactionDate = DateTime.Parse(row["Loan_Transaction_Date"].ToString().Trim()).ToShortDateString(),
						TransactionDescription = row["Loan_Transaction_Desc"].ToString().Trim(),
						TransactionAmount = double.Parse(row["Loan_Transaction_Amount"].ToString().Trim()),
						TransactionBalance = double.Parse(row["Loan_Transaction_Balance"].ToString().Trim())
					};
					loanStatement.Add(transaction);
				}


				return loanStatement;

			}
			catch (Exception ex)
			{

			}
			return null;
		}

		public async Task<LoanTotalDTO> GetLoanTotalsForCurrentMonthAsync(int branchId)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@BranchId", branchId) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery(("SP_Get_DashboardData"), parameters));

				if (dt.Rows.Count > 0)
				{
					return new LoanTotalDTO
					{
						TotalLoanedAmount = double.Parse(dt.Rows[0]["TotalAmountLoaned"].ToString().Trim()),
						TotalReturnAmount = double.Parse(dt.Rows[0]["TotalReturnAmount"].ToString().Trim()),
						TotalInterest = double.Parse(dt.Rows[0]["TotalInterestAmount"].ToString().Trim())
					};

				}
			}
			catch (Exception ex)
			{

			}
			return null;
		}

		public async Task<List<LoanLineGraphDTO>> GetLineGraphInfo()
		{
			try
			{
				DataTable dt = await Task.Run(() => DbContext.GetSelectQuery("Get_LineGraphSummaryData"));
				var totalsummaries = new List<LoanLineGraphDTO>();
				foreach (DataRow row in dt.Rows)
				{
					totalsummaries.Add(new LoanLineGraphDTO
					{
						MonthIndex = int.Parse(row["MonthIndex"].ToString().Trim()),
						CreditFacilitiesPerMonth = double.Parse(row["CreditFacilitiesPerMonth"].ToString().Trim()),
						ReturnedLoanTotalPerMonth = double.Parse(row["ReturnedLoanTotalPerMonth"].ToString().Trim()),
						LoanReceivedInterestPerMonth = double.Parse(row["LoanInterestPerMonth"].ToString().Trim()),
						TotalLossRatio = double.Parse(row["TotalLossRatio"].ToString().Trim())
					});

				}
				return totalsummaries;
			}
			catch (Exception ex)
			{

			}
			return null;
		}

		public async Task<List<LoanDTO>> GetAllCollectionsForStore(int StoreKey, int month)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@StoreKey", StoreKey), new SqlParameter("@month", month) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery("SP_GetCollectionsForStore", parameters));

				List<LoanDTO> collections = new List<LoanDTO>();

				foreach (DataRow row in dt.Rows)
				{
					collections.Add(
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
				return collections;
			}
			catch (Exception ex)
			{

			}
			return null;
		}

		public async Task<bool> IsLoanDefault(int loanId)
        {
            try
            {
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@LoanId", loanId) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery(("SP_IsLoanCollection"), parameters));

				return bool.Parse(dt.Rows[0]["Loan_Default"].ToString());


			}
			catch(Exception ex)
            {

            }
			return false;
        }

		public async Task<bool> RegisterPaymentForDefaultLoan(LoanDetailsDTO collection)
        {
            try
            {
				SqlParameter[] parameters = new SqlParameter[] {
					new SqlParameter("@LoanId", collection.LoanId),
					new SqlParameter("@PaidAmount", collection.PaidAmount),
					new SqlParameter("@LoanReturnDate", collection.ReturnDate),
					new SqlParameter("@FullPayment", collection.FullPayment)
				};
				return await Task.Run(() => DbContext.ExecuteNonQuery("SP_RegisterPaymentForDefaultLoan", parameters));
			}
			catch(Exception ex)
            {

            }
			return false;
        }


		private async Task<bool> ApplyLoanInterest(int loanId)
		{
            try
            {
                SqlParameter[] parameters = new SqlParameter[] {
                    new SqlParameter("@LoanId", loanId)
                };
                return await Task.Run(() => DbContext.ExecuteNonQuery("SP_ApplyInterestOnLoan", parameters));
            }
            catch (Exception ex)
            {

            }
            return false;
        }
	}
}
