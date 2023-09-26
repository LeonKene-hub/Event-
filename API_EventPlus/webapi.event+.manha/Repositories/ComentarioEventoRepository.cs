using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class ComentarioEventoRepository : IComentarioEventoRepository
    {
        private readonly EventContext _eventContext;

        public ComentarioEventoRepository()
        {
            _eventContext = new EventContext();
        }

        public ComentariosEvento BuscarPorId(Guid id)
        {
            try
            {
                ComentariosEvento comentario = _eventContext.ComentariosEvento.FirstOrDefault(c => c.IdComentariosEvento == id)!;

                if (comentario != null)
                {
                    return comentario;
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public void Cadastrar(ComentariosEvento comentario)
        {
            _eventContext.ComentariosEvento.Add(comentario);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            ComentariosEvento comentario = _eventContext.ComentariosEvento.Find(id);
            _eventContext.ComentariosEvento.Remove(comentario);
            _eventContext.SaveChanges();
        }
    }
}
