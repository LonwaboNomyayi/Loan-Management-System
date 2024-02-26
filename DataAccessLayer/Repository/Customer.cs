using DataAccessLayer.Contracts;
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
    public class Customer : ICustomer
    {
        public async Task<List<CustomerDetails>> GetAllCustomerDetailsStoreKey(int StoreKey)
        {
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@StoreKey", StoreKey) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery("SP_GetCustomerDetailsByStoreKey", parameters));

				List<CustomerDetails> customers = new List<CustomerDetails>();

                foreach (DataRow row in dt.Rows)
                {
					customers.Add(
						new CustomerDetails
						{
							CustomerId = (int)row["Customer_Key"],
							Name = row["Customer_Name"].ToString().Trim(),
							Surname = row["Customer_Surname"].ToString().Trim(),
							IDNumber = row["Customer_ID_Number"].ToString().Trim(),
							AddressLine1 = row["Customer_Address1"].ToString().Trim(),
							//AddressLine2 = row["Customer_Address2"].ToString().Trim(),
							//AddressLine3 = row["Customer_Address3"].ToString().Trim(),
							//AddressLine4 = row["Customer_Address4"].ToString().Trim(),
							//PostalCode = row["Customer_PostalCde"].ToString().Trim(),
							//PayDay = (int)row["Customer_Pay_Day"],
							//Salary = (double)row["Customer_Salary"],
						});
                }
				return customers;
			}
			catch (SqlException ex)
			{
				//ex.Logger();
				return null;
			}
		}


		public async Task<CustomerDetails> GetCustomerDetailsByKey(int key)
		{
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@CustomerKey", key) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery("SP_GetCustomerDetailsByKey", parameters));

				if(dt.Rows.Count > 0)
                {
					var customer =  new CustomerDetails();
					customer.CustomerId = (int)dt.Rows[0]["Customer_Key"];
					customer.Name = dt.Rows[0]["Customer_Name"].ToString().Trim();
					customer.Surname = dt.Rows[0]["Customer_Surname"].ToString().Trim();
					customer.IDNumber = dt.Rows[0]["Customer_ID_Number"].ToString().Trim();
					customer.AddressLine1 = dt.Rows[0]["Customer_Address1"].ToString().Trim();
					customer.AddressLine2 = dt.Rows[0]["Customer_Address2"].ToString().Trim();
					customer.AddressLine3 = dt.Rows[0]["Customer_Address3"].ToString().Trim();
					customer.AddressLine4 = dt.Rows[0]["Customer_Address4"].ToString().Trim();
					customer.PostalCode = dt.Rows[0]["Customer_PostalCde"].ToString().Trim();
					customer.PayDay = (int)dt.Rows[0]["Customer_Pay_Day"];
					customer.Salary = double.Parse(dt.Rows[0]["Customer_Salary"].ToString().Trim());
					return customer;
				}
				return null;
			}
			catch (SqlException ex)
			{
				//ex.Logger();
				return null;
			}
		}
    }
}
