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
							StreetAddressLine1 = row["Customer_Address1"].ToString().Trim(),
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
    }
}
