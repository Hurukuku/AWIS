using Microsoft.AspNetCore.Mvc;

namespace AWIS.API.Controllers;

public class CarsController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}