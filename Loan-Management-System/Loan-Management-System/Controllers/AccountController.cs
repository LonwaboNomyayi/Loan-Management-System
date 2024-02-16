using DataAccessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Loan_Management_System.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccounts account = new Accounts();
        // GET: Account
        public ActionResult SignIn()
        {
            return View();
        }

        public ActionResult Signin(SignInDetails model)
        {
            if (ModelState.IsValid)
            {
                var userDetails = account.GetUserDetails(model);
                if(userDetails != null)
                {
                    //then call the SessionHelper to store the userdetails - as we may need this information in some parts of the system 
                    return Json(new { data = true }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { data = false }, JsonRequestBehavior.AllowGet);
        }
    }
}