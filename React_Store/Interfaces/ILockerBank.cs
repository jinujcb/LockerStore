using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace React_Store.Interfaces
{
    interface ILockerBank
    {
        int ID { get; set; }
        string Name { get; set; }
        Nullable<int> LocationID { get; set; }
    }
}
