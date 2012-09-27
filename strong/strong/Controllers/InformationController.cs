using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace strong.Controllers
{
    public class InformationController : Controller
    {
        //
        // GET: /Default1/

        public ActionResult Index()
        {
            return View();
        }

		public ActionResult Contacts()
		{
			return View();
		}

		public ActionResult Jobs()
		{
			return View();
		}

		public ActionResult Equipment()
		{
			return View();
		}

		public ActionResult Requisites()
		{
			return View();
		}

		public ActionResult History()
		{
			return View();
		}

		public ActionResult Certificates()
		{
			return View();
		}
    }
}
