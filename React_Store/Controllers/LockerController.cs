using React_Store.Models;
using System;
using System.Data.Entity.Validation;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Data.Entity;
using Newtonsoft.Json;

namespace React_Store.Controllers
{
    public class LockerController : Controller
    {
        // GET: Sales
       LockerBankEntities db = new LockerBankEntities();
        JavaScriptSerializer ser = new JavaScriptSerializer();
        public JsonResult GetAllLockerList()
        {
            db.Configuration.ProxyCreationEnabled = false;

            List<LockerList> lockerlist = ((db.LockerLists.Include(c => c.Location).Include(c => c.LockerBank).Include(c => c.Locker)).OrderBy(c => c.Location.ID)).OrderBy(c => c.LockerBank.ID).ToList();
            //var deserializedProduct = JsonConvert.DeserializeObject<IEnumerable<ProductSold>>();

            var product = JsonConvert.SerializeObject(lockerlist, Formatting.None,
             new JsonSerializerSettings()
             {
                 ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
             }
         );
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLockerList(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            LockerList lockernew = db.LockerLists.Find(id);
            return Json(lockernew, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAllLockers(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Locker> lockerlist = db.Lockers.Where(x => x.LockerBank.ID == id).ToList(); 
            return Json(lockerlist, JsonRequestBehavior.AllowGet);
        }
      
        public JsonResult GetAllLockerBanks(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<LockerBank> lockerbanklist = db.LockerBanks.Where(x => x.Location.ID == id).ToList();
            return Json(lockerbanklist, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAllLocations()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Location> locationlist = db.Locations.ToList(); ;
            return Json(locationlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLocker(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Locker lockernew = db.Lockers.Find(id);
            return Json(lockernew, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Index()
        {
            return View("Index");
        }

        [HttpPost]
        public ActionResult Create(LockerList locker)
        {
            if (ModelState.IsValid)
            {
                db.LockerLists.Add(locker);
                db.SaveChanges();
            }
            return View();
        }


       

        [HttpPost]
        public ActionResult CreateLocation(Location location)
        {
            int id = 0;
            if (ModelState.IsValid)
            {    
                db.Locations.Add(location);
                db.SaveChanges();
                id = location.ID;
            }
            return Json(id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateLockerBank(LockerBank lockerBank)
        {
            int id = 0;
            if (ModelState.IsValid)
            {
                db.LockerBanks.Add(lockerBank);
                db.SaveChanges();
                id = lockerBank.ID;
            }
            return Json(id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateLocker(Locker locker)
        {
            int id = 0;
            if (ModelState.IsValid)
            {
                db.Lockers.Add(locker);
                db.SaveChanges();
                id = locker.ID;
            }
            return Json(id, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Edit(LockerList locker)  // Update PartialView  
        {
            if (ModelState.IsValid)
            {
                LockerList lockerlistnew = db.LockerLists.Where(X => X.ID == locker.ID).FirstOrDefault();
                if (lockerlistnew != null)
                {
                    lockerlistnew.LocationID = locker.LocationID;
                    lockerlistnew.LockerBanksID = locker.LockerBanksID;
                    lockerlistnew.LockersID = locker.LockersID;
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            else
                return View(locker);
        }


        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteLocker(int id)  // Update PartialView  
        {
            if (ModelState.IsValid)
            {
                LockerList lockernew = db.LockerLists.Where(X => X.ID == id).FirstOrDefault();
                if (lockernew != null)
                {
                    db.LockerLists.Remove(lockernew);
                    db.SaveChanges();
                }
            }
            return RedirectToAction("Index");
        }


       
    }
}

