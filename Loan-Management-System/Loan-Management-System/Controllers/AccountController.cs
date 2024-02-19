using DataAccessLayer;
using DataAccessLayer.Contracts;
using DataAccessLayer.DTO;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using Loan_Management_System.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Loan_Management_System.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccounts account = new Accounts();
        // GET: Account
        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Signin(SignInDetails model)
        {
            if (ModelState.IsValid)
            {
                var userDetails = await account.GetUserDetails(model);
                if(userDetails != null)
                {
                    //then call the SessionHelper to store the userdetails - as we may need this information in some parts of the system 
                    SessionHelper.Set("UserDetail", userDetails);

                    Json(new { success = true });
                }
            }
            return Json(new { success = true });
        }
    }
}