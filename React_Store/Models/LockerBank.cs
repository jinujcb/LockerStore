//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace React_Store.Models
{
    using System;
    using System.Collections.Generic;
    using React_Store.Interfaces;

    public partial class LockerBank:ILockerBank
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LockerBank()
        {
            this.LockerLists = new HashSet<LockerList>();
            this.Lockers = new HashSet<Locker>();
        }
    
        public int ID { get; set; }
        public string Name { get; set; }
        public Nullable<int> LocationID { get; set; }
    
        public virtual Location Location { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LockerList> LockerLists { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Locker> Lockers { get; set; }
    }
}