using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class TipoEventoRepository : ITipoEventoRepository
    {
        private readonly EventContext _eventContext;

        public TipoEventoRepository()
        {
            _eventContext = new EventContext();
        }

        public void Atualizar(Guid id, TiposEvento tipo)
        {
            TiposEvento tipoBuscado = _eventContext.TiposEvento.Find(id)!;

            if (tipoBuscado != null)
            {
                tipoBuscado.Titulo = tipo.Titulo;
            }
            _eventContext.Update(tipoBuscado);
            _eventContext.SaveChanges();
        }

        public TiposEvento BuscarPorId(Guid id)
        {
            return _eventContext.TiposEvento.FirstOrDefault(t => t.IdTipoEvento == id)!;
        }

        public void Cadastrar(TiposEvento tipoEvento)
        {
            _eventContext.TiposEvento.Add(tipoEvento);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            TiposEvento tipoEvento = _eventContext.TiposEvento.FirstOrDefault(t => t.IdTipoEvento ==id)!;
            _eventContext.TiposEvento.Remove(tipoEvento);
            _eventContext.SaveChanges();
        }

        public List<TiposEvento> Listar()
        {
            return _eventContext.TiposEvento.ToList();
        }
    }
}
