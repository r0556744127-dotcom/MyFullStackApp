import apiClient from "../api/apiClient";

export const authService = {
  login: async (identityNumber: string, password: string) => {
    const response = await apiClient.post('/Staff/login', {
      identityNumber: identityNumber.trim(),
      password: password.trim()
    });

    const data = response.data;

    if (data) {
      const isAdmin = data.role === 1;

      // ניקוי ושמירת נתונים ב-session
      sessionStorage.clear();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("teacherId", String(data.id || data.staffId));
      sessionStorage.setItem("user_type", isAdmin ? "admin" : "staff");
      sessionStorage.setItem("staff_session", JSON.stringify({
        id: data.id || data.staffId,
        full_name: data.fullName,
        role: data.role
      }));

      return { isAdmin };
    }
    
    throw new Error("No data received from server");
  }
};