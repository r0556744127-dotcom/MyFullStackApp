import { useState } from "react";
import { studentService } from "../../services/studentService";

export function useStudentLogin() {
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
      const data = await studentService.login(identityNumber, password);

      if (data) {
        studentService.saveSession(data);

        if (data.mustChangePassword) {
          studentService.saveTempSession(data);
          window.location.href = "/ChangePassword";
        } else {
          window.location.href = `/StudentClassroom/${data.classId}`;
        }
      }
    } catch (err: any) {
      setError(
        err.response?.status === 401
          ? "מספר זהות או סיסמה שגויים"
          : "אירעה שגיאה בחיבור."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    identityNumber, setIdentityNumber,
    password, setPassword,
    error, loading,
    handleLogin
  };
}