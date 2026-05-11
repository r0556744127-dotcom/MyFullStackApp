import apiClient from "../api/apiClient";

export const studentService = {
  /**
   * מעדכן סיסמה לתלמיד ומנקה נתונים זמניים מהסשן
   */
  updatePassword: async (studentId: string, newPassword: string) => {
    await apiClient.post(`/Student/update-password?id=${studentId}`, 
      JSON.stringify(newPassword), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // שליפת הנתונים לפני הניקוי לצורך ניתוב
    const classId = sessionStorage.getItem("temp_class_id");

    // ניקוי המידע הזמני
    sessionStorage.removeItem("temp_student_id");
    sessionStorage.removeItem("temp_class_id");

    return { classId };
  },

  /**
   * מקבל נתונים זמניים מהסשן לצורך התחלת תהליך החלפת סיסמה
   */
  getTempAuthData: () => {
    return {
      studentId: sessionStorage.getItem("temp_student_id"),
      classId: sessionStorage.getItem("temp_class_id")
    };
  }
};