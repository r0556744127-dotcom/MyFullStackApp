import { useState } from "react";
import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { studentService } from "../services/studentService";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    setError("");
    const { studentId } = studentService.getTempAuthData();

    // וולידציות בצד לקוח
    if (!newPassword || newPassword.length < 4) {
      setError("הסיסמה חייבת להכיל לפחות 4 תווים");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }
    if (!studentId) {
      setError("מזהה תלמיד חסר, נא לנסות להתחבר מחדש");
      return;
    }

    setLoading(true);
    try {
      const { classId } = await studentService.updatePassword(studentId, newPassword);

      if (classId && classId !== "undefined") {
        window.location.href = `/StudentClassroom/${classId}`;
      } else {
        console.error("Class ID is missing!");
        setError("מזהה כיתה חסר, נא לנסות להתחבר מחדש");
      }
    } catch (err) {
      console.error("Update password error:", err);
      setError("אירעה שגיאה בעדכון הסיסמה. וודא שהפרטים תקינים.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">החלפת סיסמה ראשונית</h1>
          <p className="text-slate-500 mt-2">למען אבטחת חשבונך, יש לבחור סיסמה חדשה</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">סיסמה חדשה</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-right focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">אימות סיסמה</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-right focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-12 font-bold flex items-center justify-center gap-2 transition-all disabled:bg-slate-300"
          >
            <CheckCircle2 size={20} />
            {loading ? "מעדכן..." : "עדכן סיסמה וכנס לכיתה"}
          </button>
        </div>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
// import apiClient from "../api/apiClient";

// export default function ChangePassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

// const handleUpdatePassword = async () => {
//   setError("");
//   const studentId = sessionStorage.getItem("temp_student_id");
//   const classId = sessionStorage.getItem("temp_class_id"); 
//   if (!newPassword || newPassword.length < 4) {
//     setError("הסיסמה חייבת להכיל לפחות 4 תווים");
//     return;
//   }
//   if (newPassword !== confirmPassword) {
//     setError("הסיסמאות אינן תואמות");
//     return;
//   }
//   setLoading(true);
//   try {
//     await apiClient.post(`/Student/update-password?id=${studentId}`, 
//       JSON.stringify(newPassword), 
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//   if (classId && classId !== "undefined") {
//             window.location.href = `/StudentClassroom/${classId}`;
//         } else {
//             console.error("Class ID is missing!");
//             setError("מזהה כיתה חסר, נא לנסות להתחבר מחדש");
//         }

//     //ניקוי המידע הזמני מה-session
//     sessionStorage.removeItem("temp_student_id");
//     sessionStorage.removeItem("temp_class_id");

//   } catch (err) {
//     console.error("Update password error:", err);
//     setError("אירעה שגיאה בעדכון הסיסמה. וודא שהפרטים תקינים.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
//       <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-slate-100">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <KeyRound className="w-8 h-8 text-amber-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-slate-800">החלפת סיסמה ראשונית</h1>
//           <p className="text-slate-500 mt-2">למען אבטחת חשבונך, יש לבחור סיסמה חדשה</p>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">סיסמה חדשה</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={e => setNewPassword(e.target.value)}
//               className="w-full p-3 border border-slate-200 rounded-xl text-right focus:ring-2 focus:ring-amber-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">אימות סיסמה</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={e => setConfirmPassword(e.target.value)}
//               className="w-full p-3 border border-slate-200 rounded-xl text-right focus:ring-2 focus:ring-amber-500 outline-none"
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
//               <AlertCircle size={16} /> {error}
//             </div>
//           )}

//           <button
//             onClick={handleUpdatePassword}
//             disabled={loading}
//             className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-12 font-bold flex items-center justify-center gap-2 transition-all disabled:bg-slate-300"
//           >
//             <CheckCircle2 size={20} />
//             {loading ? "מעדכן..." : "עדכן סיסמה וכנס לכיתה"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }