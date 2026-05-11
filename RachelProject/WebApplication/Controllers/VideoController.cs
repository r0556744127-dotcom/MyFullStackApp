using Microsoft.AspNetCore.Mvc;

namespace WebApplicationProject.Controllers
{
    public class VideoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
