using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.event_.Migrations
{
    /// <inheritdoc />
    public partial class eventdatabaseazure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ComentariosEvento_IdComentarioEvento",
                table: "ComentariosEvento",
                column: "IdComentarioEvento",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ComentariosEvento_IdComentarioEvento",
                table: "ComentariosEvento");
        }
    }
}
