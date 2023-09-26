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
    public class TipoEventoController : ControllerBase
    {
        private ITipoEventoRepository _tipoEventoRepository;

        public TipoEventoController()
        {
            _tipoEventoRepository = new TipoEventoRepository();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                List<TiposEvento> lista = new List<TiposEvento>();
                lista = _tipoEventoRepository.Listar();
                return Ok(lista);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetId(Guid id)
        {
            try
            {
                TiposEvento tipo = _tipoEventoRepository.BuscarPorId(id);
                return Ok(tipo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(TiposEvento tiposEvento)
        {
            try
            {
                _tipoEventoRepository.Cadastrar(tiposEvento);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(Guid id, TiposEvento tipo)
        {
            try
            {
                _tipoEventoRepository.Atualizar(id, tipo);
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
                _tipoEventoRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
