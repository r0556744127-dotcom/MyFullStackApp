import { useStudentClassroom } from "../components/ui/useStudentClassroom";
import StudentSidebar from "../components/ui/StudentSidebar";
import StudentLessonCard from "../components/ui/StudentLessonCard";

export default function StudentClassroom() {
  const {
    cls, loading, studentName, toast,
    selectedCategoryId, setSelectedCategoryId,
    assignmentsByLesson, submittedAssignments,
    isSubmitting, selectedFiles,
    handleToggleAssignments, handleFileChange,
    handleSubmit, handleLogout,
  } = useStudentClassroom();

  if (loading) return (
    <div className="p-20 text-center animate-pulse">טוען את חומרי הלמידה שלך...</div>
  );

  const currentLessons = cls?.lessons?.filter((l: any) =>
    Number(l.lessonCategoryId || l.LessonCategoryId) === Number(selectedCategoryId)
  ) || [];

  const selectedCategoryName = cls?.lessonCategories?.find(
    (c: any) => (c.id || c.Id) === selectedCategoryId
  )?.lessonName;

  return (
    <div dir="rtl" className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <StudentSidebar
        studentName={studentName}
        className={cls?.className}
        categories={cls?.lessonCategories || []}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              {selectedCategoryName || "בחר קטגוריה כדי להתחיל"}
            </h1>
            <p className="text-slate-400 mt-2">כל חומרי השיעור וההקלטות מחכים לך כאן</p>
          </header>

          <div className="grid grid-cols-1 gap-8">
            {currentLessons.length > 0 ? (
              currentLessons.map((l: any) => (
                <StudentLessonCard
                  key={l.idLesson}
                  lesson={l}
                  assignments={assignmentsByLesson[l.idLesson]}
                  submittedAssignments={submittedAssignments}
                  isSubmitting={isSubmitting}
                  selectedFiles={selectedFiles}
                  onToggleAssignments={handleToggleAssignments}
                  onFileChange={handleFileChange}
                  onSubmit={handleSubmit}
                />
              ))
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-50 text-slate-300">
                <p className="font-bold italic">עדיין לא הועלו שיעורים בנושא זה.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {toast && (
        <div className={`fixed bottom-6 left-6 px-5 py-3 rounded-2xl text-white font-bold shadow-xl ${
          toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
// import { useEffect, useState } from "react";
// import apiClient from "@/api/apiClient";
// import { useParams } from "react-router-dom";
// import StudentSidebar from "../components/ui/StudentSidebar";
// import StudentLessonCard from "../components/ui/StudentLessonCard";

// export default function StudentClassroom() {
//   const { id } = useParams();
//   const [cls, setCls] = useState<any>(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [studentName, setStudentName] = useState("");
//   const [submittedAssignments, setSubmittedAssignments] = useState<Set<number>>(new Set());
//   const [selectedFiles, setSelectedFiles] = useState<Record<number, File | null>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [assignmentsByLesson, setAssignmentsByLesson] = useState<Record<number, any[]>>({});
//   const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

//   const showToast = (msg: string, type: "success" | "error" = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   useEffect(() => {
//     const session = sessionStorage.getItem("student_session");
//     if (!session) { window.location.href = "/StudentLogin"; return; }

//     const studentData = JSON.parse(session);
//     setStudentName(studentData.full_name);

//     const classIdToLoad = (id && id !== "undefined") ? id : studentData.class_id;
//     if (classIdToLoad) loadClassData(classIdToLoad);
//     else setLoading(false);

//     const studentId = studentData.id || studentData.Id;
//     apiClient.get(`/Submission/student/${studentId}/submitted`)
//       .then(res => setSubmittedAssignments(new Set(res.data)));

//     const interval = setInterval(() => refreshGrades(), 7000);
//     return () => clearInterval(interval);
//   }, [id]);

//   const loadClassData = async (classId: string | number) => {
//     try {
//       setLoading(true);
//       const res = await apiClient.get(`/ClassRoom/${classId}`);
//       setCls(res.data);
//       if (res.data.lessonCategories?.length > 0) {
//         const first = res.data.lessonCategories[0];
//         setSelectedCategoryId(first.id || first.Id);
//       }
//     } catch (err) {
//       console.error("שגיאה בטעינת נתוני הכיתה", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshGrades = async () => {
//     const session = sessionStorage.getItem("student_session");
//     if (!session) return;
//     const studentData = JSON.parse(session);
//     const studentId = studentData.id || studentData.Id;
//     try {
//       const res = await apiClient.get(`/Submission/student/${studentId}/grades`);
//       const gradesFromServer = res.data;
//       setAssignmentsByLesson(prev => {
//         const newState = { ...prev };
//         Object.keys(newState).forEach(key => {
//           newState[Number(key)] = newState[Number(key)].map((asgn: any) => {
//             const found = gradesFromServer.find((g: any) => g.assignmentId === (asgn.id || asgn.Id));
//             return found ? { ...asgn, myGrade: found.grade, teacherComment: found.teacherComment } : asgn;
//           });
//         });
//         return { ...newState };
//       });
//     } catch (err) {
//       console.error("שגיאה בריענון ציונים:", err);
//     }
//   };

//   const handleToggleAssignments = async (lessonId: number) => {
//     if (assignmentsByLesson[lessonId]) {
//       setAssignmentsByLesson(prev => { const s = { ...prev }; delete s[lessonId]; return s; });
//       return;
//     }
//     try {
//       const res = await apiClient.get(`/Assignment/lesson/${lessonId}`);
//       setAssignmentsByLesson(prev => ({ ...prev, [lessonId]: res.data }));
//     } catch {
//       showToast("שגיאה בטעינת המטלות", "error");
//     }
//   };

//   const handleFileChange = (asgnId: number, file: File | null) => {
//     setSelectedFiles(prev => ({ ...prev, [asgnId]: file }));
//   };

//   const handleSubmit = async (assignmentId: number) => {
//     const currentFile = selectedFiles[assignmentId];
//     if (!currentFile) { showToast("אנא בחר קובץ לפני השליחה", "error"); return; }

//     const session = sessionStorage.getItem("student_session");
//     if (!session) return;
//     const studentData = JSON.parse(session);
//     const studentId = studentData.id || studentData.Id;

//     const formData = new FormData();
//     formData.append("File", currentFile);
//     formData.append("AssignmentId", assignmentId.toString());
//     formData.append("StudentId", studentId.toString());

//     try {
//       setIsSubmitting(true);
//       await apiClient.post(`/Submission/submit/${studentId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       showToast("העבודה הוגשה בהצלחה!");
//       setSelectedFiles(prev => ({ ...prev, [assignmentId]: null }));
//       setSubmittedAssignments(prev => new Set(prev).add(assignmentId));
//       await refreshGrades();
//     } catch {
//       showToast("שגיאה בהגשת העבודה", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <div className="p-20 text-center animate-pulse">טוען את חומרי הלמידה שלך...</div>;

//   const currentLessons = cls?.lessons?.filter((l: any) =>
//     Number(l.lessonCategoryId || l.LessonCategoryId) === Number(selectedCategoryId)
//   ) || [];

//   const selectedCategoryName = cls?.lessonCategories?.find(
//     (c: any) => (c.id || c.Id) === selectedCategoryId
//   )?.lessonName;

//   return (
//     <div dir="rtl" className="flex h-screen bg-slate-50 font-sans text-slate-900">
//       <StudentSidebar
//         studentName={studentName}
//         className={cls?.className}
//         categories={cls?.lessonCategories || []}
//         selectedCategoryId={selectedCategoryId}
//         onSelectCategory={setSelectedCategoryId}
//         onLogout={() => { sessionStorage.clear(); window.location.href = "/"; }}
//       />

//       <main className="flex-1 p-10 overflow-y-auto">
//         <div className="max-w-4xl mx-auto">
//           <header className="mb-12">
//             <h1 className="text-4xl font-black text-slate-800 tracking-tight">
//               {selectedCategoryName || "בחר קטגוריה כדי להתחיל"}
//             </h1>
//             <p className="text-slate-400 mt-2">כל חומרי השיעור וההקלטות מחכים לך כאן</p>
//           </header>

//           <div className="grid grid-cols-1 gap-8">
//             {currentLessons.length > 0 ? (
//               currentLessons.map((l: any) => (
//                 <StudentLessonCard
//                   key={l.idLesson}
//                   lesson={l}
//                   assignments={assignmentsByLesson[l.idLesson]}
//                   submittedAssignments={submittedAssignments}
//                   isSubmitting={isSubmitting}
//                   selectedFiles={selectedFiles}
//                   onToggleAssignments={handleToggleAssignments}
//                   onFileChange={handleFileChange}
//                   onSubmit={handleSubmit}
//                 />
//               ))
//             ) : (
//               <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-50 text-slate-300">
//                 <p className="font-bold italic">עדיין לא הועלו שיעורים בנושא זה.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {toast && (
//         <div className={`fixed bottom-6 left-6 px-5 py-3 rounded-2xl text-white font-bold shadow-xl ${
//           toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
//         }`}>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// }