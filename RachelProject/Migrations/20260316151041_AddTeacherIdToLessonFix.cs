using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace codeFirst.Migrations
{
    /// <inheritdoc />
    public partial class AddTeacherIdToLessonFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_ClassRooms_ClassRoomId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_LessonCategory_LessonCategoryId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_Staffs_TeacherId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Students_ClassRooms_ClassRoomId",
            //    table: "Students");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Submissions_Assignments_AssignmentId",
            //    table: "Submissions");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Submissions_Students_StudentId",
            //    table: "Submissions");

            //migrationBuilder.AddColumn<int>(
            //    name: "ClassRoomId",
            //    table: "LessonCategory",
            //    type: "int",
            //    nullable: false,
            //    defaultValue: 0);

            //migrationBuilder.CreateIndex(
            //    name: "IX_LessonCategory_ClassRoomId",
            //    table: "LessonCategory",
            //    column: "ClassRoomId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_LessonCategory_ClassRooms_ClassRoomId",
            //    table: "LessonCategory",
            //    column: "ClassRoomId",
            //    principalTable: "ClassRooms",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_ClassRooms_ClassRoomId",
            //    table: "Lessons",
            //    column: "ClassRoomId",
            //    principalTable: "ClassRooms",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_LessonCategory_LessonCategoryId",
            //    table: "Lessons",
            //    column: "LessonCategoryId",
            //    principalTable: "LessonCategory",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_Staffs_TeacherId",
            //    table: "Lessons",
            //    column: "TeacherId",
            //    principalTable: "Staffs",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Students_ClassRooms_ClassRoomId",
            //    table: "Students",
            //    column: "ClassRoomId",
            //    principalTable: "ClassRooms",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Submissions_Assignments_AssignmentId",
            //    table: "Submissions",
            //    column: "AssignmentId",
            //    principalTable: "Assignments",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Submissions_Students_StudentId",
            //    table: "Submissions",
            //    column: "StudentId",
            //    principalTable: "Students",
            //    principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_LessonCategory_ClassRooms_ClassRoomId",
            //    table: "LessonCategory");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_ClassRooms_ClassRoomId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_LessonCategory_LessonCategoryId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Lessons_Staffs_TeacherId",
            //    table: "Lessons");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Students_ClassRooms_ClassRoomId",
            //    table: "Students");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Submissions_Assignments_AssignmentId",
            //    table: "Submissions");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Submissions_Students_StudentId",
            //    table: "Submissions");

            //migrationBuilder.DropIndex(
            //    name: "IX_LessonCategory_ClassRoomId",
            //    table: "LessonCategory");

            //migrationBuilder.DropColumn(
            //    name: "ClassRoomId",
            //    table: "LessonCategory");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_ClassRooms_ClassRoomId",
            //    table: "Lessons",
            //    column: "ClassRoomId",
            //    principalTable: "ClassRooms",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_LessonCategory_LessonCategoryId",
            //    table: "Lessons",
            //    column: "LessonCategoryId",
            //    principalTable: "LessonCategory",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Lessons_Staffs_TeacherId",
            //    table: "Lessons",
            //    column: "TeacherId",
            //    principalTable: "Staffs",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Students_ClassRooms_ClassRoomId",
            //    table: "Students",
            //    column: "ClassRoomId",
            //    principalTable: "ClassRooms",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Submissions_Assignments_AssignmentId",
            //    table: "Submissions",
            //    column: "AssignmentId",
            //    principalTable: "Assignments",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Submissions_Students_StudentId",
            //    table: "Submissions",
            //    column: "StudentId",
            //    principalTable: "Students",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }
    }
}
