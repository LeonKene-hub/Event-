using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;
using webapi.event_.manha.Repositories;

namespace webapi.event_.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PresensaEventoController : ControllerBase
    {
        private IPresencasEventoRepository _presensaEventoRepository;

        public PresensaEventoController()
        {
            _presensaEventoRepository = new PresencasEventoRepository();
        }

        [HttpPost]
        public IActionResult Post(PresencasEvento presensa)
        {
            try
            {
                _presensaEventoRepository.Cadastrar(presensa);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetMine(Guid id)
        {
            try
            {
                List<PresencasEvento> lista = new List<PresencasEvento>();
                lista = _presensaEventoRepository.ListarMinhas(id);
                return Ok(lista);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(Guid id, PresencasEvento presensa)
        {
            try
            {
                _presensaEventoRepository.Atualizar(id, presensa);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _presensaEventoRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
