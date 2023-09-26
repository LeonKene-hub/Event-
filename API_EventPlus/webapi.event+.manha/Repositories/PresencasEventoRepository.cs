using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class PresencasEventoRepository : IPresencasEventoRepository
    {
        private readonly EventContext _eventContext;

        public PresencasEventoRepository()
        {
            _eventContext = new EventContext();
        }

        public void Atualizar(Guid id, PresencasEvento presencasEvento)
        {
            PresencasEvento presensa = _eventContext.PresencasEvento.Find(id);

            if (presensa != null)
            {
                presensa.Situacao = presencasEvento.Situacao;
                presensa.IdEvento = presencasEvento.IdEvento;
            }

            _eventContext.Update(presensa);
            _eventContext.SaveChanges();
        }

        public void Cadastrar(PresencasEvento presencasEvento)
        {
            _eventContext.PresencasEvento.Add(presencasEvento);
            _eventContext.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            PresencasEvento presenca = _eventContext.PresencasEvento.Find(id)!;
            _eventContext.PresencasEvento.Remove(presenca);
            _eventContext.SaveChanges();
        }

        public List<PresencasEvento> ListarMinhas(Guid id)
        {
            List<PresencasEvento> lista = new List<PresencasEvento>();

            lista = _eventContext.PresencasEvento.Where(p => p.IdPresencasEvento == id).ToList();
            return lista;
        }
    }
}
