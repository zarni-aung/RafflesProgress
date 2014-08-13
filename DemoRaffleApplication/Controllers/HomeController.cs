using DemoRaffleApplication.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace DemoRaffleApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Event()
        {
            ViewBag.Message = "Your event page.";

            return View();
        }
        public ActionResult Event2()
        {
            ViewBag.Message = "Your event page 2.";

            return View();
        }
        public ActionResult Main()
        {
            ViewBag.Message = "Your event page 2.";

            return View();
        }
        public ActionResult Angular()
        {
            ViewBag.Message = "Your event page 2.";

            return View();
        }
        public ActionResult DemoUser()
        {
            ViewBag.Message = "Demo user page";

            return PartialView();
        }

        public ActionResult DemoAdmin()
        {
            ViewBag.Message = "Demo admin page";

            return View();
        }

        public ActionResult DemoCreateUser()
        {
            ViewBag.Message = "Demo admin page";
            //GetCaptcha();
            return PartialView();
            //return View();
        }
        public ActionResult AdminScheme()
        {
            ViewBag.Message = "Demo admin page";

            return View();
        }
        private List<char> AsciiNumber()
        {
            var az = Enumerable.Range('A', 'Z' - 'A' + 1).
                      Select(c => (char)c);

            var ot = Enumerable.Range(0, 10).Select(i => Convert.ToChar(i.ToString()));

            return az.Concat(ot).ToList();

        }

        public ActionResult GetCaptcha()
        {
            ViewBag.Message = "Demo admin page";
            Bitmap Bmp = new Bitmap(200, 20);
            Graphics gx = Graphics.FromImage(Bmp);

            var txt = shuffle<char>(AsciiNumber());

            Console.WriteLine(String.Join("", txt.Take(6).ToArray()));
            gx.DrawString(String.Join("", txt.Take(6).ToArray()), new Font("Arial", 10),
                            new SolidBrush(Color.Blue), new PointF(0F, 0));
            var cvtr = new ImageConverter();
            byte[] bytes = cvtr.ConvertTo(Bmp, typeof(byte[])) as byte[];

            //var mem = new System.IO.FileStream(@"d:\zarni\ctcha.jpeg", FileMode.Create);
            //Bmp.Save(@"d:\zarni\ctcha4.png", System.Drawing.Imaging.ImageFormat.Png);
            //var stream = new MemoryStream();
            //Bmp.Save(stream, System.Drawing.Imaging.ImageFormat.Png);

            return File(bytes, "image/png");
            //Response.BinaryWrite(bytes);

            // return View();
        }
        private static List<T> shuffle<T>(List<T> lsin)
        {
            Random r = new Random();
            int n = lsin.Count;
            List<T> lsOut = new List<T>();
            lsOut.AddRange(lsin);
            while (n > 1)
            {
                var k = r.Next(n);
                n--;
                T temp = lsOut[n];
                lsOut[n] = lsOut[k];
                lsOut[k] = temp;
            }
            return lsOut;
        }
        [HttpGet]
        public ActionResult EventLists()
        {

            using (RfContext db = new RfContext())
            {
                var evt = db.RfEvents;
                Console.WriteLine("evt count: " + db.RfEvents.Count());
                return Content(JsonConvert.SerializeObject(evt));
            }

        }

        [HttpGet]
        public ActionResult EventDelete(int eventId)
        {
            int count = 0;
            try
            {
                using (RfContext db = new RfContext())
                {
                    var evt = db.RfEvents.FirstOrDefault(r => r.Id == eventId);
                    db.RfEvents.Remove(evt);
                    db.SaveChanges();
                    count = db.RfEvents.Count();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting: " + ex.ToString());
            }

            var obj = new { eventCount = count.ToString() };
            return Content(JsonConvert.SerializeObject(obj));

        }

        public ActionResult EventCreate(RfEvent rf)
        {
            int retId = 0;
            try
            {
                using (RfContext db = new RfContext())
                {
                    var evt = db.RfEvents.Add(rf);
                    db.SaveChanges();
                    retId = evt.Id;
                    Console.WriteLine("evt count: " + db.RfEvents.Count());
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine("Error: " + ex.ToString());
            }
            var obj = new { retValue = retId };
            return Content(JsonConvert.SerializeObject(obj));
        }



        public ActionResult SchemeCreate(RfScheme schm)
        {

            int retId = 0;
            try
            {
                using (RfContext db = new RfContext())
                {
                    var addedScheme = db.RfSchemes.Add(schm);
                    db.SaveChanges();
                    retId = addedScheme.Id;
                    Console.WriteLine("scheme count: " + db.RfSchemes.Count());
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine("Error: " + ex.ToString());
            }
            var obj = new { retValue = retId };
            return Content(JsonConvert.SerializeObject(obj));
        }

        [HttpGet]
        public ActionResult SchemeDelete(int schemeId)
        {
            int count = 0;
            try
            {
                using (RfContext db = new RfContext())
                {
                    var evt = db.RfSchemes.FirstOrDefault(r => r.Id == schemeId);
                    db.RfSchemes.Remove(evt);
                    db.SaveChanges();
                    count = db.RfSchemes.Count();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting: " + ex.ToString());
            }

            var obj = new { schemeCount = count.ToString() };
            return Content(JsonConvert.SerializeObject(obj));

        }

        public ActionResult SchemeActivate(int schemeId, string[] users)
        {
            try
            {
                using (RfContext db = new RfContext())
                {
                    var scheme = db.RfSchemes.FirstOrDefault(r => r.Id == schemeId);

                    var mktInsert = new List<string>() { };
                    var idcInsert = new List<string>() { };
                    foreach (var u in users)
                    {

                        var mkt2 = from m in scheme.UserMarkets.Split(',')
                                   select "('" + u + "', '" + m + "')";

                        mktInsert.Add(string.Join(",", mkt2.ToArray()));

                        var idc = from m in scheme.UserIndicators.Split(',')
                                  select "('" + u + "', '" + m + "')";

                        idcInsert.Add(string.Join(",", idc.ToArray()));

                    }
                    var sql = new StringBuilder("Insert Into UserMarkets values ");

                    sql.Append(string.Join(",", mktInsert));

                    int ct = db.Database.ExecuteSqlCommand(sql.ToString());

                    var sql2 = new StringBuilder("Insert Into UserIndicators values ");

                    sql2.Append(string.Join(",", mktInsert));

                    int ct2 = db.Database.ExecuteSqlCommand(sql2.ToString());



                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error activating: " + ex.ToString());
            }
            var obj = new { retValue = true };
            return Content(JsonConvert.SerializeObject(obj));
        }


        [HttpGet]
        public ActionResult Scheme()
        {
            //return View();
            //var str = new JObject("data something");
            //var r = new  JSONNetResult(str);
            //var str = new JObject("data something");

            dynamic cResponse = new ExpandoObject();
            cResponse.Property1 = "value1";
            cResponse.Property2 = "value2";
            var obj = new { retValue = "data someting" };
            return Content(JsonConvert.SerializeObject(obj));


            //$http.get('/Home/Scheme')
            //.success(function (data, status, headers, config) {
            //    // this callback will be called asynchronously
            //    // when the response is available
            //    console.log(data)
            //            }).
            //error(function (data, status, headers, config) {
            //    // called asynchronously if an error occurs
            //    // or server returns response with an error status.
            //});

            // return r;
        }

        public ActionResult SchemeLists()
        {
            try
            {
                using (RfContext db = new RfContext())
                {
                   var schms =  db.RfSchemes;
                   var obj  =  JsonConvert.SerializeObject(schms);
                   var ctnt = this.Content(obj);

                   return ctnt;
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine("scheme lists error:" + ex);
            }
            return null;
        }
    }
}
