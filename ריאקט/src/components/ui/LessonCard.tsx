// import AssignmentCard from "./AssignmentCard";

// type LessonCardProps = {
//   lesson: any;
//   assignments: any[];
//   submittedAssignments: Set<number>;
//   isSubmitting: boolean;
//   selectedFiles: Record<number, File | null>;
//   onToggleAssignments: (lessonId: number) => void;
//   onFileChange: (asgnId: number, file: File | null) => void;
//   onSubmit: (asgnId: number) => void;
// };

// export default function LessonCard({
//   lesson,
//   assignments,
//   submittedAssignments,
//   isSubmitting,
//   selectedFiles,
//   onToggleAssignments,
//   onFileChange,
//   onSubmit,
// }: LessonCardProps) {
//   return (
//     <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
//       <div className="flex items-center gap-3 mb-4">
//         <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">שיעור</span>
//         <span className="text-slate-400 text-xs">📅 {new Date(lesson.date).toLocaleDateString('he-IL')}</span>
//       </div>

//       <h3 className="text-2xl font-black mb-3 text-slate-800">{lesson.titelLesson}</h3>
//       <p className="text-slate-500 leading-relaxed mb-8">{lesson.summary}</p>

//       <button
//         onClick={() => onToggleAssignments(lesson.idLesson)}
//         className="mt-4 text-xs text-indigo-600 hover:text-indigo-800 font-bold text-right bg-indigo-50 px-3 py-1 rounded-lg"
//       >
//         {assignments ? "הסתר מטלות" : "➕ לצפייה במטלות השיעור"}
//       </button>

//       {assignments && (
//         <div className="mt-4 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
//           <h4 className="text-sm font-bold text-slate-700 mb-2">מטלות לשיעור:</h4>
//           {assignments.length > 0 ? (
//             assignments.map((asgn: any) => {
//               const asgnId = asgn.id || asgn.Id;
//               return (
//                 <AssignmentCard
//                   key={asgnId}
//                   asgn={asgn}
//                   isSubmitted={submittedAssignments.has(asgnId)}
//                   isSubmitting={isSubmitting}
//                   selectedFile={selectedFiles[asgnId] || null}
//                   onFileChange={file => onFileChange(asgnId, file)}
//                   onSubmit={() => onSubmit(asgnId)}
//                 />
//               );
//             })
//           ) : (
//             <p className="text-xs text-slate-400 italic">אין מטלות זמינות לשיעור זה.</p>
//           )}
//         </div>
//       )}

//       {/* הקלטה */}
//     {lesson.recordingLink && (() => {
//   const link = typeof lesson.recordingLink === "string"
//     ? lesson.recordingLink
//     : lesson.recordingLink?.absoluteUri || String(lesson.recordingLink);

//   if (!link || link.startsWith("file:///")) return null;

//   return (
//     <div className="mt-6 text-center">
//       <a
//         href={link}
//         target="_blank"
//         rel="noreferrer"
//         className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg inline-block"
//       >
//         📥 הורד את הסרטון לצפייה
//       </a>
//     </div>
//   );
// })()}
//     </div>
//   );
// }
import { Trash2, Plus, Calendar, FileText } from "lucide-react";
import AssignmentRow from "./AssignmentRow";

type LessonCardProps = {
  lesson: any;
  showAssignmentForm: number | null;
  newAssignment: any;
  viewingAssignmentId: number | null;
  editingAssignment: number | null;
  editAssignmentData: any;
  submissions: any[];
  editingSubmissionId: number | null;
  gradeInput: string;
  commentInput: string;
  getEmbedUrl: (link: any) => string | null;
  onDeleteLesson: (id: number) => void;
  onShowAssignmentForm: (id: number) => void;
  onAssignmentChange: (data: any) => void;
  onAddAssignment: (lessonId: number) => void;
  onViewSubmissions: (id: number) => void;
  onEditAssignmentStart: (asn: any) => void;
  onEditAssignmentChange: (data: any) => void;
  onEditAssignmentSave: (id: number) => void;
  onEditAssignmentCancel: () => void;
  onDeleteAssignment: (id: number) => void;
  onGradeEditStart: (sub: any) => void;
  onGradeChange: (val: string) => void;
  onCommentChange: (val: string) => void;
  onSaveGrade: (id: number) => void;
  onCancelGradeEdit: () => void;
  onCloseSubmissions: () => void;
  onViewSubmissionFile: (submissionId: number, fileName?: string) => void; // <--- להוסיף את השורה הזו
};

export default function LessonCard({
  lesson, showAssignmentForm, newAssignment, viewingAssignmentId,
  editingAssignment, editAssignmentData, submissions, editingSubmissionId,
  gradeInput, commentInput, getEmbedUrl,
  onDeleteLesson, onShowAssignmentForm, onAssignmentChange, onAddAssignment,
  onViewSubmissions, onEditAssignmentStart, onEditAssignmentChange,
  onEditAssignmentSave, onEditAssignmentCancel, onDeleteAssignment,
  onGradeEditStart, onGradeChange, onCommentChange, onSaveGrade,
  onCancelGradeEdit, onCloseSubmissions,
  onViewSubmissionFile // <--- להוסיף את זה לכאן כדי לקבל את הפונקציה
}: LessonCardProps) {
  const lId = lesson.idLesson || lesson.IdLesson;
  const ytEmbed = getEmbedUrl(lesson.recordingLink || lesson.RecordingLink);
  const linkStr = typeof (lesson.recordingLink || lesson.RecordingLink) === 'string'
    ? (lesson.recordingLink || lesson.RecordingLink)
    : (lesson.recordingLink || lesson.RecordingLink)?.absoluteUri || String(lesson.recordingLink || lesson.RecordingLink);

  return (
    <div className="bg-white p-8 rounded-2xl shadow relative">
      <div className="flex justify-between items-start mb-6">
        <span className="text-sm text-gray-400 flex items-center gap-2">
          <Calendar size={14} />
          {new Date(lesson.date || lesson.Date).toLocaleDateString('he-IL')}
        </span>
        <button onClick={() => onDeleteLesson(lId)} className="text-red-500">
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="text-2xl font-bold mb-2">{lesson.titelLesson || lesson.TitelLesson}</h3>
      <p className="text-gray-500 mb-4">{lesson.summary || lesson.Summary}</p>

      {ytEmbed ? (
        <iframe className="w-full h-64 rounded-xl" src={ytEmbed} allowFullScreen />
      ) : linkStr && !linkStr.startsWith('file:///') ? (
        linkStr.endsWith(".mp4") || linkStr.endsWith(".webm") ? (
          <video controls className="w-full h-64 rounded-xl bg-black">
            <source src={linkStr} type="video/mp4" />
          </video>
        ) : (
          <a href={linkStr} target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">
            לחץ כאן לצפייה בהקלטה חיצונית
          </a>
        )
      ) : null}

      <div className="mt-4 flex justify-end">
        <button onClick={() => onShowAssignmentForm(lId)}
          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-sm hover:bg-indigo-600 hover:text-white flex items-center gap-1">
          <Plus size={14} /> הוספת מטלה
        </button>
      </div>

      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
          <FileText size={16} /> מטלות לשיעור זה:
        </h4>
        <div className="space-y-2">
          {lesson.assignments?.map((asn: any) => (
            <AssignmentRow
              key={asn.id}
              asn={asn}
              viewingAssignmentId={viewingAssignmentId}
              editingAssignment={editingAssignment}
              editAssignmentData={editAssignmentData}
              submissions={submissions}
              editingSubmissionId={editingSubmissionId}
              gradeInput={gradeInput}
              commentInput={commentInput}
              onView={onViewSubmissions}
              onEditStart={onEditAssignmentStart}
              onEditChange={onEditAssignmentChange}
              onEditSave={onEditAssignmentSave}
              onEditCancel={onEditAssignmentCancel}
              onDelete={onDeleteAssignment}
              onGradeEditStart={onGradeEditStart}
              onGradeChange={onGradeChange}
              onCommentChange={onCommentChange}
              onSaveGrade={onSaveGrade}
              onCancelGradeEdit={onCancelGradeEdit}
              onCloseSubmissions={onCloseSubmissions}
              onViewSubmissionFile={onViewSubmissionFile} // <--- להוסיף את השורה הזו כדי למסור אותה הלאה!
            />
          ))}
        </div>
      </div>

      {showAssignmentForm === lId && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border">
          <input placeholder="כותרת מטלה" value={newAssignment.AssignmentName}
            onChange={e => onAssignmentChange({ ...newAssignment, AssignmentName: e.target.value })}
            className="border p-2 w-full mb-2" />
          <input placeholder="כותרת" value={newAssignment.Title}
            onChange={e => onAssignmentChange({ ...newAssignment, Title: e.target.value })}
            className="border p-2 w-full mb-2" />
          <input type="date" value={newAssignment.date}
            onChange={e => onAssignmentChange({ ...newAssignment, date: e.target.value })}
            className="border p-2 w-full mb-2" />
          <input type="file"
            onChange={e => onAssignmentChange({ ...newAssignment, File: e.target.files?.[0] || null })}
            className="border p-2 w-full mb-2" />
          <div className="flex gap-2">
            <button onClick={() => onAddAssignment(lId)}
              className="bg-green-600 text-white px-4 py-2 rounded-xl">שמור מטלה</button>
            <button onClick={() => onShowAssignmentForm(0)}
              className="bg-gray-300 px-4 py-2 rounded-xl">ביטול</button>
          </div>
        </div>
      )}
    </div>
  );
}