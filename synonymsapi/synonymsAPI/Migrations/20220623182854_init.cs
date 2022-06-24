using Microsoft.EntityFrameworkCore.Migrations;

namespace synonymsAPI.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "wordConnections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    word1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    word2 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wordConnections", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "wordConnections",
                columns: new[] { "Id", "word1", "word2" },
                values: new object[,]
                {
                    { 1, "hurry", "run" },
                    { 2, "hurry", "rush" },
                    { 3, "run", "hurry" },
                    { 4, "rush", "hurry" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "wordConnections");
        }
    }
}
