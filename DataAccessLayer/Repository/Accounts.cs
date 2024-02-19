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
    public class Accounts : IAccounts
    {
        //let us authenticate the user
        public async Task<UserDetails> GetUserDetails(SignInDetails model)
        {
			try
			{
				SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@Username", model.Username), new SqlParameter("@Password", model.Password) };
				DataTable dt = await Task.Run(() => DbContext.GetParamatizedQuery("SP_GetUserDetails", parameters));

                if (dt.Rows.Count > 0)
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
