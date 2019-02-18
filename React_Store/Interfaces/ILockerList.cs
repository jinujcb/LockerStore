using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace React_Store.Interfaces
{
    interface ILockerList
    {
         int ID { get; set; }
         int LocationID { get; set; }
         int LockerBanksID { get; set; }
         int LockersID { get; set; }
    }
}
