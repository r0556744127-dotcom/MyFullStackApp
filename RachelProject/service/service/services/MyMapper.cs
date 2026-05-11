using AutoMapper;
using Repositories.models;
using service.Dto;

namespace service.services
{
    public class MyMapper : Profile
    {
        public MyMapper()
        {
            CreateMap<UpdateClassRoomDto, ClassRoom>();

            CreateMap<Student, UserResponseDto>();
            CreateMap<UpdateLessonDto, Lesson>()
    .ForMember(dest => dest.RecordingLink, opt => opt.Ignore()); // מטופל ידנית בService
            // מיפוי מה-DTO של יצירת סטודנט חזרה לישות (עבור ה-Repository)
            CreateMap<CreateStudentDto, Student>();

            // אם שמות השדות שונים (למשל אם ב-Student זה 'Id' וב-DTO זה 'StudentId')
            // את צריכה להוסיף הגדרה ספציפית כך:
            CreateMap<Student, UserResponseDto>()
                .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.Id))
.ForMember(dest => dest.ClassId, opt => opt.MapFrom(src => src.ClassRoomId));            //CreateMap<Staff, UserResponseDto>();

            // מיפוי מה-DTO של יצירת סטודנט חזרה לישות (עבור ה-Repository)

            // אם שמות השדות שונים (למשל אם ב-Student זה 'Id' וב-DTO זה 'StudentId')
            // את צריכה להוסיף הגדרה ספציפית כך:
            //CreateMap<Staff, UserResponseDto>()
            //    .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.Id));
            CreateMap<Staff, UserResponseDto>()
               .ForMember(dest => dest.StaffId, opt => opt.MapFrom(src => src.Id));
            CreateMap<UpdateAssignmentDto, Assignment>()
    .ForMember(dest => dest.FilePath, opt => opt.Ignore()); // FilePath מטופל ידנית בService
            // מיפוי משתמש בסיסי
            CreateMap<User, UserDto>().ReverseMap();

            // יצירת מורה/מנהל - עכשיו כששני השדות נקראים FullName המיפוי אוטומטי
            CreateMap<CreateStaffDto, Staff>().ReverseMap();

            // יצירת תלמיד - גם כאן השדות זהים (FullName)
            CreateMap<Student, CreateStudentDto>()

                   .ForMember(dest => dest.studentId, opt => opt.MapFrom(src => src.Id))

                 .ForMember(dest => dest.ClassRoomId, opt => opt.MapFrom(src => src.ClassRoomId))

                .ReverseMap();

            // כיתות ושיעורים (הוספתי ReverseMap כדי למנוע שגיאות בשליפה)
            CreateMap<ClassRoom, ClassDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name)) // מיפוי ידני רק לשדה ששמו שונה
                .ReverseMap();
            // CreateMap<ClassRoom, ClassDetailDto>().ReverseMap();
            //CreateMap<Lesson, LessonDto>().ReverseMap();
            CreateMap<Lesson, LessonDto>()
       .ForMember(dest => dest.idLesson, opt => opt.MapFrom(src => src.idLesson))
       .ForMember(dest => dest.titelLesson, opt => opt.MapFrom(src => src.titelLesson))
       .ForMember(dest => dest.RecordingLink, opt => opt.MapFrom(src => src.RecordingLink))
       .ForMember(dest => dest.Summary, opt => opt.MapFrom(src => src.Summary))
       .ForMember(dest => dest.Assignments, opt => opt.MapFrom(src => src.Assignments))
       .ReverseMap();
            // הגשות ומטלות
            CreateMap<UpdateStaffDto, Staff>();
            CreateMap<UpdateStudentDto, Student>()
    .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.Email));
            CreateMap<Assignment, StudentAssignmentDto>();
            CreateMap<UpdateLessonCategoryDto, LessonCategory>();
            CreateMap<Submission, UpdateSubmissionFileDto>();
            CreateMap<CreateSubmissionDto, Submission>().ReverseMap();
            //CreateMap<Submission, StudentSubmissionDto>().ReverseMap();
            //        CreateMap<Submission, StudentSubmissionDto>()
            //// אומרים למפר לקחת את Id ולהכניס אותו ל-SubmissionId
            //.ForMember(dest => dest.SubmissionId, opt => opt.MapFrom(src => src.Id))

            //// אומרים למפר לקחת את ה-Title מתוך ה-Assignment המקושר
            //.ForMember(dest => dest.AssignmentTitle, opt => opt.MapFrom(src => src.Assignment.Title));
            CreateMap<Submission, StudentSubmissionDto>()
     .ForMember(dest => dest.SubmissionId, opt => opt.MapFrom(src => src.Id))
     .ForMember(dest => dest.AssignmentTitle, opt => opt.MapFrom(src => src.Assignment.Title))
     .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.FullName)); // <-- זה חסר
            CreateMap<Submission, TeacherSubmissionDto>().ReverseMap();
            CreateMap<UpdateGradeDto, Submission>().ReverseMap();
            CreateMap<Assignment, TeacherAssignmentDto>().ReverseMap();
            CreateMap<CreateAssignmentDto, Assignment>().ReverseMap();
            CreateMap<ClassDetailDto, ClassRoom>()
    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ClassName))
    .ReverseMap();
            // מיפוי נוסף לסטודנט אם יש צורך
            CreateMap<LessonCategory, CreateLessonDto>()
       .ForMember(dest => dest.lessonName, opt => opt.MapFrom(src => src.Name))
       .ForMember(dest => dest.classId, opt => opt.MapFrom(src => src.ClassRoomId));

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<CreateLessonDto, LessonCategory>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.lessonName))
                .ForMember(dest => dest.ClassRoomId, opt => opt.MapFrom(src => src.classId))
                .ForMember(dest => dest.Lessons, opt => opt.Ignore()) // לא ממפים את הרשימה כרגע
                .ForMember(dest => dest.ClassRoom, opt => opt.Ignore()); // מניחים ש־ClassRoom נטען דרך Id        }
        }
    }
}