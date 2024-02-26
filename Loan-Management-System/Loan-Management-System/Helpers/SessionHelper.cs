using DataAccessLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Loan_Management_System.Helpers
{
    public static class SessionHelper
    {
        public static UserDetails GetUserInfo {
            get => Get<UserDetails>("UserDetail");
                
        }

        public static void SetUserDetails(UserDetails userDetails)
        {
            Set("UserDetail", userDetails);
        }


        private static T Get<T>(string key)
        {
            var valueFromSession = HttpContext.Current.Session[key];
            if (valueFromSession is T)
            {
                return (T)valueFromSession;
            }
            return default(T);
        }

        private static void Set(string key, object value)
        {
            HttpContext.Current.Session[key] = value;
        }

        private static void Remove(string key)
        {
            HttpContext.Current.Session.Remove(key);
        }
    }
}