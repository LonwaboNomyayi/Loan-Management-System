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
    public class Accounts : IAccounts
    {
        //let us authenticate the user
        public async Task<UserDetails> GetUserDetails(SignInDetails model)
        {
			try
			{
				DataTable dt = await Task.Run(() => DbContext.GetSelectQuery("SP_GET_QuoteReasons"));

                if (dt.HasErrors)
                {
					return new UserDetails
					{
						UserId = (int)dt.Rows[0]["Users_Id"],
						UserlogInName = dt.Rows[0]["Users_login_name"].ToString().Trim(),
						UserPassword = dt.Rows[0]["Users_Password"].ToString().Trim(),
						UserStaffNo = dt.Rows[0]["Users_Staff_No"].ToString().Trim(),
						UserStoreId = (int)dt.Rows[0]["Users_Store"],
					};

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
