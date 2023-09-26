using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class TiposUsuarioRepository : ITiposUsuarioRepository
    {
        private readonly EventContext _eventContext;

        public TiposUsuarioRepository()
        {
            _eventContext= new EventContext();
        }

        public void Atualizar(Guid id, TiposUsuario tipoUsuario)
        {
            TiposUsuario tipoBuscado = _eventContext.TiposUsuario.Find(id)!;

            if (tipoBuscado != null)
            {
                tipoBuscado.Titulo = tipoUsuario.Titulo;
            }
            _eventContext.Update(tipoBuscado);
            _eventContext.SaveChanges();
        }

        public TiposUsuario BuscarPorId(Guid id)
        {
            return _eventContext.TiposUsuario.FirstOrDefault(t => t.IdTipoUsuario == id)!;
        }

        public void Cadastrar(TiposUsuario tipoUsuario)
        {
            _eventContext.TiposUsuario.Add(tipoUsuario);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            TiposUsuario tipoUsuario = _eventContext.TiposUsuario.FirstOrDefault(t => t.IdTipoUsuario == id)!;
            _eventContext.TiposUsuario.Remove(tipoUsuario);
            _eventContext.SaveChanges();
        }

        public List<TiposUsuario> Listar()
        {
            return _eventContext.TiposUsuario.ToList();
        }
    }
}
