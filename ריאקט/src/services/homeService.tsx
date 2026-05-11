import apiClient from "../api/apiClient";

export const homeService = {
  /**
   * מחלץ את שם המשתמש מהאחסון המקומי
   */
  getUserDisplayName: (): string => {
    try {
      const studentSession = sessionStorage.getItem("student_session");
      const staffSession = sessionStorage.getItem("staff_session");

      if (studentSession) {
        return JSON.parse(studentSession).full_name || "תלמיד";
      } 
      if (staffSession) {
        return JSON.parse(staffSession).full_name || "איש צוות";
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
    return "אורח";
  },

  /**
   * מקבל סטטיסטיקות כלליות עבור דף הבית
   */
  getGeneralStats: async () => {
    const res = await apiClient.get("/ClassRoom");
    return {
      classesCount: Array.isArray(res.data) ? res.data.length : 0
    };
  }
};