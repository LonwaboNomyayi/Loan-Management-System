using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DTO
{
    public class UserDetails
    {
        public int UserId { get; set; }
        public string UserlogInName { get; set; }
        public string UserStaffNo { get; set; }
        public string UserPassword{ get; set; }
        public int UserStoreId { get; set; }

    }
}
