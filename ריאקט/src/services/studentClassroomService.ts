import apiClient from "@/api/apiClient";

export interface Grade {
  assignmentId: number;
  grade: number;
  teacherComment: string;
}

export const studentClassroomService = {
  async getClassData(classId: string | number) {
    const res = await apiClient.get(`/ClassRoom/${classId}`);
    return res.data;
  },

  async getSubmittedAssignments(studentId: number) {
    const res = await apiClient.get(`/Submission/student/${studentId}/submitted`);
    return res.data as number[];
  },

  async getGrades(studentId: number) {
    const res = await apiClient.get(`/Submission/student/${studentId}/grades`);
    return res.data as Grade[];
  },

  async getAssignmentsByLesson(lessonId: number) {
    const res = await apiClient.get(`/Assignment/lesson/${lessonId}`);
    return res.data;
  },

  async submitAssignment(assignmentId: number, studentId: number, file: File) {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("AssignmentId", assignmentId.toString());
    formData.append("StudentId", studentId.toString());

    await apiClient.post(`/Submission/submit/${studentId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getStudentSession() {
    const session = sessionStorage.getItem("student_session");
    if (!session) return null;
    const data = JSON.parse(session);
    return {
      id: data.id || data.Id,
      full_name: data.full_name,
      class_id: data.class_id,
    };
  }
};