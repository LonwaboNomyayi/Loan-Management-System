﻿using DataAccessLayer.Contracts;
using DataAccessLayer.DTO;
using DataAccessLayer.Models;
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

        public ActionResult Statements(int Id)
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


        public async Task<JsonResult> RegisterLoan(LoanDetails loanDetais)
        {
            loanDetais.LoanStore = SessionHelper.GetUserInfo.UserStoreId;
            var serverResults = await _loans.RegisterLoan(loanDetais);

            return Json(new { data = serverResults }, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UpdateLoanPayment(LoanDetailsDTO loanDetails)
        {
            var serviceResult = await _loans.UpdateLoanPayment(loanDetails);
            return Json(new { data = serviceResult }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> DefaultLoan(LoanDetailsDTO loanDetails)
        {
            var serviceResult = await _loans.DefaultLoan(loanDetails);
            return Json(new { data = serviceResult }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<JsonResult> GetLoanStatements(int Id)
        {
            var serviceResult = await _loans.GetLoanStatements(Id);
            return Json(new { data = serviceResult }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<JsonResult> GetLoanTotalsForCurrentMonth()
        {
            var branch = SessionHelper.GetUserInfo;
            if (branch != null)
            {
                var serviceResults = await _loans.GetLoanTotalsForCurrentMonthAsync(branch.UserStoreId);
                return Json(new { data = serviceResults }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { data = false }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public async Task<JsonResult> GetLineGraphInfoSummaries()
        {
            var serverResults = await _loans.GetLineGraphInfo();
            return Json(new { data = serverResults }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Private Routines 

        #endregion
    }
}