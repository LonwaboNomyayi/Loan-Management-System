using DataAccessLayer.Contracts;
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
    public class CustomerController : Controller
    {
        private readonly ICustomer customer = new Wrapper().customers;
        // GET: Customer



        #region Views
        public ActionResult Index()
        {
            return View();
        }

        //Customer Details Screen 
        public ActionResult CustomerDetails(int Id)
        {
            ViewBag.CustomerId = Id;
            return View();
        }

        #endregion





        [HttpGet]
        public async Task<JsonResult> GetAllCUstomersForStore()
        {
            //the user currently logged in must only see the customers linked to the store they are registered in
            
            var customers = await GetAllCustomersInStore();

            return Json(new { data = customers }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public async Task<JsonResult> GetCustomerDetailsByKey(int Id)
        {
            var thisCustomer = await customer.GetCustomerDetailsByKey(Id);
            return Json(new { data = thisCustomer }, JsonRequestBehavior.AllowGet);
        }


        #region Private Routines 


        private async Task<List<CustomerDetails>> GetAllCustomersInStore()
        {
            var userDetails = SessionHelper.GetUserInfo;
            var customers = await customer.GetAllCustomerDetailsStoreKey(userDetails.UserStoreId);
            return customers;
        }
        #endregion

    }
}