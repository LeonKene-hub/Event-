using webapi.event_.manha.Domains;

namespace webapi.event_.manha.Interfaces
{
    public interface IComentarioEventoRepository
    {
        void Cadastrar(ComentariosEvento comentario);

        void Deletar(Guid id);

        ComentariosEvento BuscarPorId(Guid id);
    }
}
