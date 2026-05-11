using codeFirst.models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Repositories.InterFaces;
using Repositories.models;
using Repositories.Repositories;
using service.Common;
using service.Implementations;
using service.interfaces;
using service.services;

namespace WebApplicationProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions
            {
                Args = args,
                WebRootPath = "wwwroot" // הגדרה מפורשת של תיקיית הקבצים
            });
            builder.Services.AddDbContext<School>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IContext, School>();
            builder.Services.AddScoped<School>();
            // Services
            builder.Services.AddScoped<IstudentService, studentService>();
            builder.Services.AddScoped<IStaffService, StaffService>();
            builder.Services.AddScoped<IClassRoomService, ClassRoomService>();
            builder.Services.AddScoped<IAssignmentService, AssignmentService>();
            builder.Services.AddScoped<ILessonService, LessonService>();
            builder.Services.AddScoped<ILessonCategoryService, LessonCategoryService>();
            builder.Services.AddScoped<IsubmissionService, SubmissionService>();
            // Repositories
            builder.Services.AddScoped<StudentRepository>();
            builder.Services.AddScoped<StaffRepository>();
            builder.Services.AddScoped<ClassRoomRepository>();
            builder.Services.AddScoped<AssignmentRepository>();
            builder.Services.AddScoped<SubmissionRepository>();
            builder.Services.AddScoped<LessonRepository>();
            builder.Services.AddScoped<LessonCategoryRepository>();

            builder.Services.AddScoped<IRepository<Student>, StudentRepository>();
            builder.Services.AddScoped<IRepository<Assignment>, AssignmentRepository>();
            builder.Services.AddScoped<IRepository<Submission>, SubmissionRepository>();
            builder.Services.AddScoped<IRepository<ClassRoom>, ClassRoomRepository>();
            builder.Services.AddScoped<IRepository<Lesson>, LessonRepository>();
            builder.Services.AddScoped<IRepository<LessonCategory>, LessonCategoryRepository>();

            // AutoMapper
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            builder.Services.AddControllers();
            builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = 1024 * 1024 * 1024; // 100MB
            });
            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Limits.MaxRequestBodySize = 1073741824; // 500MB
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<TokenService>();

            var app = builder.Build();


            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseHttpsRedirection();
            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = true,
                DefaultContentType = "application/octet-stream"
            }); // מאפשר גישה לתיקיית wwwroot
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Submissions")
    ),
                RequestPath = "/Submissions"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.WebRootPath, "videos")),
                RequestPath = "/videos"
            });
            app.UseCors("AllowReactApp");

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}