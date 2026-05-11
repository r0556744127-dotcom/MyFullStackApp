using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace codeFirst.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "LessonCategory",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "LessonCategory",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Lessons",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Lessons",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Assignments",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Assignments",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Submissions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Submissions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "IsDeleted", table: "LessonCategory");
            migrationBuilder.DropColumn(name: "DeletedAt", table: "LessonCategory");
            migrationBuilder.DropColumn(name: "IsDeleted", table: "Lessons");
            migrationBuilder.DropColumn(name: "DeletedAt", table: "Lessons");
            migrationBuilder.DropColumn(name: "IsDeleted", table: "Assignments");
            migrationBuilder.DropColumn(name: "DeletedAt", table: "Assignments");
            migrationBuilder.DropColumn(name: "IsDeleted", table: "Submissions");
            migrationBuilder.DropColumn(name: "DeletedAt", table: "Submissions");
        }
    }
}
