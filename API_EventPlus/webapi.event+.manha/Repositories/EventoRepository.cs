using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class EventoRepository : IEventoRepository
    {

        private readonly EventContext _eventContext;

        public EventoRepository()
        {
            _eventContext = new EventContext();
        }

        public void Atualizar(Guid id, Evento evento)
        {
            Evento eventoBuscado =  _eventContext.Evento.Find(id)!;

            if (eventoBuscado != null)
            {
                eventoBuscado.NomeEvento = evento.NomeEvento;
                eventoBuscado.DataEvento = evento.DataEvento;
                eventoBuscado.Descricao = evento.Descricao;
            }
             _eventContext.Update(eventoBuscado);
             _eventContext.SaveChanges();
        }

        public Evento BuscarPorId(Guid id)
        {
            try
            {
                Evento eventoBuscado = _eventContext.Evento.FirstOrDefault(e => e.IdEvento == id)!;

                if (eventoBuscado != null)
                {
                    return eventoBuscado;
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Evento evento)
        {
            _eventContext.Evento.Add(evento);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            Evento evento = _eventContext.Evento.Find(id)!;
            _eventContext.Evento.Remove(evento);
            _eventContext.SaveChanges();
        }

        public List<Evento> Listar()
        {
            return _eventContext.Evento.ToList();
        }
    }
}
