using Microsoft.AspNetCore.Mvc;
using synonyms.Model.Requests;
using synonymsAPI.Repositories.Interfaces;


namespace synonymsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class wordController : ControllerBase
    {
        IWord _service;
        public wordController(IWord service)
        {
            _service = service;
        }


        [HttpPost]
        public IActionResult AddSynonyms(wordUpsert request)
        {
            var syn = _service.Insert(request);
            if (syn == null)
            {
                return BadRequest(new { message = "Something went wrong." });
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult GetSynonyms([FromQuery] string searchTerm)
        {
            var syn = _service.GetSynonyms(searchTerm);
            if (syn == null)
            {
                return BadRequest(new { message = "Something went wrong." });
            }
            return Ok(syn);
        }
    }
}
