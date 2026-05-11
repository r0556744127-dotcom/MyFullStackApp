import { useState } from "react";
import { authService } from "../services/authService";
import LoginCardStaff from "../components/ui/LoginCardStaff";

export default function StaffLogin() {
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    
    if (!identityNumber.trim() || !password.trim()) {
      setError("נא למלא מספר זהות וסיסמה");
      return;
    }

    setLoading(true);
   
    try {
      const { isAdmin } = await authService.login(identityNumber, password);
      
      // ניתוב המשתמש לפי הרשאה
      window.location.href = isAdmin ?"/Classes" : "/AllClasses" ;
      
    } catch (err: any) {
      const serverError = err.response?.data || "שגיאת התחברות";
      if (err.response?.status === 401) {
        setError(typeof serverError === "string" ? serverError : "מספר זהות או סיסמה שגויים");
      } else {
        setError("אירעה שגיאה בחיבור לשרת");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center p-4" dir="rtl">
      <LoginCardStaff
        title="כניסה לצוות"
        subtitle="הכנס מספר זהות וסיסמה"
        identityNumber={identityNumber}
        password={password}
        error={error}
        loading={loading}
        onIdentityChange={e => setIdentityNumber(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onLogin={handleLogin}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
