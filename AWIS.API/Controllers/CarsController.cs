using AWIS.Application.Cars;
using AWIS.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AWIS.API.Controllers;

public class CarsController : BaseApiController
{
    private readonly ISender _sender;

    public CarsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        return await _sender.Send(new GetCarsList.Query());
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var car = await _sender.Send(new Details.Query { Id = id });

        if (car is null)
        {
            return NotFound();
        }

        return car;
    }
}