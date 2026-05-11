import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent, clearError } from "../features/auth/authSlice";
import LoginCard from "../components/ui/LoginCard";

export default function StudentLogin() {
  const [identityNumber, setIdentityNumber] = useState(""); 
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: any) => state.auth);

  // האזנה לשינוי במשתמש - אם הוא התחבר בהצלחה, ננווט אותו
  useEffect(() => {
    if (user) {
      if (user.mustChangePassword) {
        window.location.href = "/ChangePassword";
      } else {
        window.location.href = `/StudentClassroom/${user.classId}`;
      }
    }
  }, [user]);

  const handleLogin = () => {
    dispatch(clearError());
    
    if (!identityNumber.trim() || !password.trim()) {
      return;
    }
    const idRegex = /^\d{9}$/;
  if (!idRegex.test(identityNumber)) {
    // כאן אפשר להפעיל שגיאה ספציפית
    return;
  }

    dispatch(loginStudent({ identityNumber, password }) as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center p-4" dir="rtl">
      <LoginCard
        identityNumber={identityNumber}
        password={password}
        error={error}
        loading={loading}
        onIdentityChange={e => setIdentityNumber(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onLogin={handleLogin}
      />
    </div>
  );
}
// import { useState } from "react";
// import { studentService } from "../services/studentService";
// import LoginCard from "../components/ui/LoginCard";

// export default function StudentLogin() {
//   const [identityNumber, setIdentityNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setError("");
    
//     if (!identityNumber.trim() || !password.trim()) {
//       setError("נא למלא מספר זהות וסיסמה");
//       return;
//     }

//     setLoading(true);
//     try {
//       // קריאה לשירות ההתחברות
//       const data = await studentService.login(identityNumber, password);

//       if (data) {
//         // שמירת הסשן דרך השירות
//         studentService.saveSession(data);

//         if (data.mustChangePassword) {
//           studentService.saveTempAuthData(data);
//           window.location.href = "/ChangePassword";
//         } else {
//           window.location.href = `/StudentClassroom/${data.classId}`;
//         }
//       }
//     } catch (err: any) {
//       setError(err.response?.status === 401 ? "מספר זהות או סיסמה שגויים" : "אירעה שגיאה בחיבור.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center p-4" dir="rtl">
//       <LoginCard
//         identityNumber={identityNumber}
//         password={password}
//         error={error}
//         loading={loading}
//         onIdentityChange={e => setIdentityNumber(e.target.value)}
//         onPasswordChange={e => setPassword(e.target.value)}
//         onLogin={handleLogin}
//       />
//     </div>
//   );
// }
