using Microsoft.AspNetCore.Mvc;
using RoleBasedAuthorization.Models;
using RoleBasedAuthorization.Repository.Interfaces;

namespace RoleBasedAuthorization.Controllers
{
    public class ActiveDoctorsController : Controller
    {
        private readonly IActiveDoctors _context;

        public ActiveDoctorsController(IActiveDoctors context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<ActiveDoctors>> PostActiveDoctor(ActiveDoctors activedoctors)
        {
            try
            {
                var item = await _context.PostActiveDoctor(activedoctors);
                return Ok(item);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiveDoctors>>> GetActiveDoctors()
        {
            try
            {
                var ht = await _context.GetActiveDoctors();
                return Ok(ht);
            }
            catch (Exception er)
            {
                return BadRequest(er.Message);
            }
        }
    }
}
