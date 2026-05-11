import apiClient from "../api/apiClient";

export const classService = {
  /**
   * מקבל רשימת כיתות לפי מזהה מורה
   */
  getClassesByTeacher: async (teacherId: string | number) => {
    const response = await apiClient.get(`/ClassRoom/teacher/${teacherId}`);
    return response.data || [];
  },

  /**
   * בודק הרשאות גישה ושלמות סשן
   */
  getStaffSession: () => {
    const session = sessionStorage.getItem("staff_session");
    const userType = sessionStorage.getItem("user_type");
    
    if (userType === "student") return { error: "access_denied" };
    if (!session) return { error: "no_session" };

    try {
      return { data: JSON.parse(session) };
    } catch {
      return { error: "invalid_session" };
    }
  }
};