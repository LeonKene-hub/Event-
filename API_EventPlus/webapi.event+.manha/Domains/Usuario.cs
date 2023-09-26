using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.event_.manha.Domains
{
    [Table(nameof(Usuario))]
    [Index(nameof(Email),IsUnique =true)]
    public class Usuario
    {
        [Key]
        public Guid IdUsuario { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage ="Nome do usuario e obrigatorio")]
        public string? Nome { get; set; }

        [Column(TypeName ="VARCHAR(100)")]
        [Required(ErrorMessage = "Email do usuario e obrigatorio")]
        public string? Email { get; set; }

        [Column(TypeName ="VARCHAR(60)")]
        [Required(ErrorMessage = "Senha do usuario e obrigatorio")]
        [StringLength(60, MinimumLength =6, ErrorMessage ="Senha deve conter de 6 a 60 caracteres")]
        public string? Senha { get; set; }

        //ref a tabela TiposUsuario
        [Required(ErrorMessage ="Informe o tipo do usuario")]
        public Guid IdTipoUsuairo { get; set;}

        [ForeignKey("IdTipoUsuairo")]
        public TiposUsuario? TiposUsuario { get; set; }

    }
}