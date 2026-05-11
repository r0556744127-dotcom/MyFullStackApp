import apiClient from "../api/apiClient";

export const studentService = {
  /**
   * התחברות ראשונית של תלמיד
   */
  login: async (identityNumber: string, password: string) => {
    const response = await apiClient.post('/Student/login', {
      identityNumber: identityNumber.trim(),
      password: password.trim()
    });
    return response.data; // מחזיר את פרטי המשתמש וה-Token
  },

  /**
   * שמירת נתוני המשתמש בסשן לאחר התחברות מוצלחת
   */
  saveSession: (data: any) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user_type", "student");
    sessionStorage.setItem("student_session", JSON.stringify({
      id: data.studentId || data.id,
      full_name: data.fullName,
      class_id: data.classId
    }));
  },

  /**
   * שמירת נתונים זמניים למקרה שהתלמיד חייב להחליף סיסמה
   */
  saveTempAuthData: (data: any) => {
    sessionStorage.setItem("temp_student_id", String(data.studentId || data.id));
    sessionStorage.setItem("temp_class_id", String(data.classId));
  },

  /**
   * שליפת הנתונים הזמניים לצורך עמוד החלפת סיסמה
   */
  getTempAuthData: () => {
    return {
      studentId: sessionStorage.getItem("temp_student_id"),
      classId: sessionStorage.getItem("temp_class_id")
    };
  },

  /**
   * עדכון סיסמה בשרת וניקוי נתונים זמניים
   */
  updatePassword: async (studentId: string, newPassword: string) => {
    await apiClient.post(`/Student/update-password?id=${studentId}`, 
      JSON.stringify(newPassword), 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    const classId = sessionStorage.getItem("temp_class_id");
    sessionStorage.removeItem("temp_student_id");
    sessionStorage.removeItem("temp_class_id");

    return { classId };
  }
};