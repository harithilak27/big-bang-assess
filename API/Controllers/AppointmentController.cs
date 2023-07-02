using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RoleBasedAuthorization.Models;
using RoleBasedAuthorization.Repository.Interfaces;

namespace RoleBasedAuthorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AngularCORS")]
    public class AppointmentController : Controller
    {
        private readonly IAppointment _context;
        public AppointmentController(IAppointment context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Appointments>> PostAppointment(Appointments appointment)
        {
            try
            {
                var item = await _context.PostAppointment(appointment);
                return Ok(item);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointments>>> GetAppointments()
        {
            try
            {
                var ht = await _context.GetAppointments();
                return Ok(ht);
            }
            catch (Exception er)
            {
                return BadRequest(er.Message);
            }
        }
    }
}
