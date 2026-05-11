// import { useState } from "react";
// import emailjs from "@emailjs/browser";

// // ─── הגדר כאן את פרטי EmailJS שלך ───────────────────────────────────────────
// const EMAILJS_SERVICE_ID  = "service_jdnicm4";
// const EMAILJS_TEMPLATE_ID = "template_6l0k2h9";
// const EMAILJS_PUBLIC_KEY  = "wmx51JkjDM0ZoMtXO"; 

// type SubmissionsTableProps = {
//   submissions: any[];
//   editingSubmissionId: number | null;
//   gradeInput: string;
//   commentInput: string;
//   onEditStart: (sub: any) => void;
//   onGradeChange: (val: string) => void;
//   onCommentChange: (val: string) => void;
//   onSaveGrade: (submissionId: number) => void;
//   onCancelEdit: () => void;
//   onClose: () => void;
//   onViewSubmissionFile: (submissionId: number, fileName?: string) => void;
//   assignmentName?: string; // שם המטלה — מומלץ להעביר מבחוץ
// };

// export default function SubmissionsTable({
//   submissions,
//   editingSubmissionId,
//   gradeInput,
//   commentInput,
//   onEditStart,
//   onGradeChange,
//   onCommentChange,
//   onSaveGrade,
//   onCancelEdit,
//   onClose,
//   onViewSubmissionFile,
//   assignmentName = "המטלה",
// }: SubmissionsTableProps) {

//   const [emailStatus, setEmailStatus] = useState<Record<number, "sending" | "sent" | "error">>({});

//   /**
//    * שולח מייל לתלמיד לאחר שמירת ציון.
//    *
//    * ⚠️  שנה את שם השדה כאן אם המייל נמצא תחת מפתח אחר ב-sub:
//    *     למשל: sub.email  /  sub.student_email  /  sub.emailAddress
//    */
//   const sendGradeNotification = async (sub: any, grade: string) => {
//       console.log("sub object:", sub); // הוסף שורה זו

//     const studentEmail = sub.studentEmail; // <── שנה כאן לפי הצורך

//     if (!studentEmail) {
//       console.warn("לא נמצאה כתובת מייל עבור", sub.studentName);
//       return;
//     }

//     setEmailStatus(prev => ({ ...prev, [sub.submissionId]: "sending" }));

//     try {
//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         {
//           to_email:     studentEmail,
//           student_name: sub.studentName,
//           grade:        grade,
//           assignment:   assignmentName,
//           comment:      sub.comment || "",
//         },
//         EMAILJS_PUBLIC_KEY
//       );
//       setEmailStatus(prev => ({ ...prev, [sub.submissionId]: "sent" }));
//     } catch (err) {
//       console.error("שגיאה בשליחת מייל:", err);
//       setEmailStatus(prev => ({ ...prev, [sub.submissionId]: "error" }));
//     }
//   };

//   /** שומר ציון ואחר כך שולח מייל */
// const handleSaveAndNotify = async (sub: any) => {
//   setEmailStatus(prev => ({ ...prev, [sub.submissionId]: "sending" }));
//   await sendGradeNotification(sub, gradeInput); // קודם שלח מייל
//   onSaveGrade(sub.submissionId); // אחר כך שמור (וסגור עריכה)
// };

//   return (
//     <div className="p-4 bg-slate-50 animate-in fade-in duration-300">
//       <h5 className="text-xs font-black text-indigo-700 mb-2 underline">
//         רשימת הגשות מהתלמידים:
//       </h5>

//       {submissions.length > 0 ? (
//         <table className="w-full text-sm text-right bg-white rounded-lg overflow-hidden shadow-sm">
//           <thead className="bg-slate-100 text-slate-600">
//             <tr>
//               <th className="p-2 border">שם התלמיד</th>
//               <th className="p-2 border">תאריך הגשה</th>
//               <th className="p-2 border">ציון</th>
//               <th className="p-2 border">עריכת ציון</th>
//               <th className="p-2 border">קובץ להגשה</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map(sub => (
//               <tr key={sub.submissionId} className="hover:bg-slate-50 border-b">

//                 {/* שם */}
//                 <td className="p-2 border">{sub.studentName}</td>

//                 {/* תאריך */}
//                 <td className="p-2 border text-xs">
//                   {new Date(sub.submittedAt).toLocaleTimeString("he-IL")}{" "}
//                   {new Date(sub.submittedAt).toLocaleDateString("he-IL")}
//                 </td>

//                 {/* ציון */}
//                 <td className="p-2 border font-bold text-indigo-600">
//                   {sub.grade || "טרם נבדק"}
//                 </td>

//                 {/* עריכת ציון */}
//                 <td className="p-2 border">
//                   {editingSubmissionId === sub.submissionId ? (
//                     <div className="flex flex-col gap-1">
//                       <input
//                         type="number"
//                         placeholder="ציון"
//                         value={gradeInput}
//                         onChange={e => onGradeChange(e.target.value)}
//                         className="border p-1 rounded w-full text-sm"
//                       />
//                       <input
//                         placeholder="הערה"
//                         value={commentInput}
//                         onChange={e => onCommentChange(e.target.value)}
//                         className="border p-1 rounded w-full text-sm"
//                       />
//                       <div className="flex gap-1 flex-wrap">
//                         <button
//                           onClick={() => handleSaveAndNotify(sub)}
//                           className="bg-emerald-600 text-white px-2 py-1 rounded text-xs"
//                         >
//                           שמור ושלח מייל 📧
//                         </button>
//                         <button
//                           onClick={() => onSaveGrade(sub.submissionId)}
//                           className="bg-indigo-500 text-white px-2 py-1 rounded text-xs"
//                         >
//                           שמור בלבד
//                         </button>
//                         <button
//                           onClick={onCancelEdit}
//                           className="bg-gray-300 px-2 py-1 rounded text-xs"
//                         >
//                           ביטול
//                         </button>
//                       </div>

//                       {/* סטטוס שליחת מייל */}
//                       {emailStatus[sub.submissionId] === "sending" && (
//                         <span className="text-xs text-slate-400">שולח מייל...</span>
//                       )}
//                       {emailStatus[sub.submissionId] === "sent" && (
//                         <span className="text-xs text-emerald-600">✓ מייל נשלח בהצלחה</span>
//                       )}
//                       {emailStatus[sub.submissionId] === "error" && (
//                         <span className="text-xs text-red-500">✗ שגיאה בשליחת מייל</span>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-1 items-start">
//     <button
//       onClick={() => onEditStart(sub)}
//       className="text-indigo-600 hover:text-indigo-800 text-xs font-bold"
//     >
//       ✏️ ערוך ציון
//     </button>
//     {emailStatus[sub.submissionId] === "sent" && (
//       <span className="text-xs text-emerald-600 font-bold">✅ מייל נשלח בהצלחה!</span>
//     )}
//     {emailStatus[sub.submissionId] === "error" && (
//       <span className="text-xs text-red-500 font-bold">❌ שגיאה בשליחת מייל</span>
//     )}
//     {emailStatus[sub.submissionId] === "sending" && (
//       <span className="text-xs text-slate-400">📨 שולח מייל...</span>
//     )}
//   </div>
//                   )}
//                 </td>

//                 {/* קובץ */}
//                 <td className="p-2 border">
//                   <a
//                     href={`https://localhost:7030/Submissions/${sub.filePath}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     👁 פתח קובץ
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-xs text-slate-500 py-4 text-center italic">
//           טרם בוצעו הגשות למטלה זו.
//         </p>
//       )}

//       <button
//         onClick={onClose}
//         className="mt-2 text-[10px] text-slate-400 hover:text-red-500 font-bold"
//       >
//         סגור רשימה ✕
//       </button>
//     </div>
//   );
// }
import { Trash2, Eye } from "lucide-react";

type SubmissionsTableProps = {
  submissions: any[];
  editingSubmissionId: number | null;
  gradeInput: string;
  commentInput: string;
  onEditStart: (sub: any) => void;
  onGradeChange: (val: string) => void;
  onCommentChange: (val: string) => void;
  onSaveGrade: (submissionId: number) => void;
  onCancelEdit: () => void;
  onClose: () => void;
  onViewSubmissionFile: (submissionId: number, fileName?: string) => void; // הוספנו ל-Props
};

export default function SubmissionsTable({
  submissions, editingSubmissionId, gradeInput, commentInput,
  onEditStart, onGradeChange, onCommentChange, onSaveGrade, onCancelEdit, onClose,
  onViewSubmissionFile // מקבלים את הפונקציה מבחוץ
}: SubmissionsTableProps) {
  
  // מחקנו את הפונקציה שזרקה שגיאה, כי אנחנו משתמשים בזו שהגיעה מה-Props

  return (
    <div className="p-4 bg-slate-50 animate-in fade-in duration-300">
      <h5 className="text-xs font-black text-indigo-700 mb-2 underline">רשימת הגשות מהתלמידים:</h5>
      {submissions.length > 0 ? (
        <table className="w-full text-sm text-right bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-2 border">שם התלמיד</th>
              <th className="p-2 border">תאריך הגשה</th>
              <th className="p-2 border">ציון</th>
              <th className="p-2 border">עריכת ציון</th>
              <th className="p-2 border">קובץ להגשה</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.submissionId} className="hover:bg-slate-50 border-b">
                <td className="p-2 border">{sub.studentName}</td>
                <td className="p-2 border text-xs">
                  {new Date(sub.submittedAt).toLocaleTimeString('he-IL')}{" "}
                  {new Date(sub.submittedAt).toLocaleDateString('he-IL')}
                </td>
                <td className="p-2 border font-bold text-indigo-600">
                  {sub.grade || "טרם נבדק"}
                </td>
                <td className="p-2 border">
                  {editingSubmissionId === sub.submissionId ? (
                    <div className="flex flex-col gap-1">
                      <input type="number" placeholder="ציון" value={gradeInput}
                        onChange={e => onGradeChange(e.target.value)}
                        className="border p-1 rounded w-full text-sm" />
                      <input placeholder="הערה" value={commentInput}
                        onChange={e => onCommentChange(e.target.value)}
                        className="border p-1 rounded w-full text-sm" />
                      <div className="flex gap-1">
                        <button onClick={() => onSaveGrade(sub.submissionId)}
                          className="bg-emerald-600 text-white px-2 py-1 rounded text-xs">שמור</button>
                        <button onClick={onCancelEdit}
                          className="bg-gray-300 px-2 py-1 rounded text-xs">ביטול</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => onEditStart(sub)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">
                      ✏️ ערוך ציון
                    </button>
                  )}
                </td>
                {/* העברנו את הכפתור לעמודה משלו, כך שהוא תמיד מופיע */}
                <td className="p-2 border">
                  {/* <button 
                    onClick={() => onViewSubmissionFile(sub.submissionId)} // <--- התיקון! קוראים לפונקציה שהבאנו ב-Props
                    className="text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md font-bold"
                  >
                    📄 צפה בקובץ
                  </button> */}
                  <a href={`https://localhost:7030/Submissions/${sub.filePath}`}
                    target="_blank" rel="noopener noreferrer">👁 פתח קובץ</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-xs text-slate-500 py-4 text-center italic">טרם בוצעו הגשות למטלה זו.</p>
      )}
      <button onClick={onClose} className="mt-2 text-[10px] text-slate-400 hover:text-red-500 font-bold">
        סגור רשימה ✕
      </button>
    </div>
  );
}

