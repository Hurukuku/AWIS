using Microsoft.AspNetCore.Mvc;

namespace AWIS.API.Controllers;

public class BaseController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}