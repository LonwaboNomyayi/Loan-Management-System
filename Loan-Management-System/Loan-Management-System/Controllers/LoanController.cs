﻿using DataAccessLayer.Contracts;
using DataAccessLayer.Wrapper;
using Loan_Management_System.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Loan_Management_System.Controllers
{
    public class LoanController : Controller
    {
        // GET: Loan
        private readonly ILoan _loans = new Wrapper().Loan;


        #region Views 
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoanDetails(int Id)
        {
            ViewBag.LoanId = Id;
            return View();

        }

        #endregion


        #region Data Requests
        [HttpGet]
        public async Task<JsonResult> GetAllLoansForStore()
        {
            var branchId = SessionHelper.GetUserInfo.UserStoreId;
            var serverResults = await _loans.GetAllLoansForStore(branchId);

            return Json(new { data = serverResults }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<JsonResult> GetLoanDetails(int id)
        {
            var serverResults = await _loans.GetLoanByKey(id);

            return Json(new { data = serverResults }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<JsonResult> GetLoanStatuses()
        {
            var serverResults = await _loans.GetLoanStatuses();

            return Json(new { data = serverResults }, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}