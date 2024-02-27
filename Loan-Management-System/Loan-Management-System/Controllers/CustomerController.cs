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
        private readonly ICustomer _customer = new Wrapper().Customer;
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
            var thisCustomer = await _customer.GetCustomerDetailsByKey(Id);
            return Json(new { data = thisCustomer }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> AddOrUpdateCustomer(CustomerDetails customer)
        {

            //lets the branch that we need to link this customer to 

            customer.StoreId = SessionHelper.GetUserInfo.UserStoreId;
            var result = await _customer.AddOrUpdateCustomerDetails(customer);

            if (result)
            {
                return Json(new { data = result }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { data = result, message = "Could not save customer details - Please contact support team." }, JsonRequestBehavior.AllowGet);

        }


        #region Private Routines 


        private async Task<List<CustomerDetails>> GetAllCustomersInStore()
        {
            var userDetails = SessionHelper.GetUserInfo;
            var customers = await _customer.GetAllCustomerDetailsStoreKey(userDetails.UserStoreId);
            return customers;
        }
        #endregion

    }
}