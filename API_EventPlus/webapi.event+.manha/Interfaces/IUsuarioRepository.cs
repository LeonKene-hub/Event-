using webapi.event_.manha.Domains;

namespace webapi.event_.manha.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        void Deletar(Guid id);

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmail(string email, string senha);
    }
}
