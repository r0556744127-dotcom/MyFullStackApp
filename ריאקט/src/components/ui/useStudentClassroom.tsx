import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { studentClassroomService } from "../../services/studentClassroomService";

export function useStudentClassroom() {
  const { id } = useParams();
  const [cls, setCls] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState<Set<number>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<Record<number, File | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignmentsByLesson, setAssignmentsByLesson] = useState<Record<number, any[]>>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const student = studentClassroomService.getStudentSession();
    if (!student) { window.location.href = "/StudentLogin"; return; }

    setStudentName(student.full_name);

    const classIdToLoad = (id && id !== "undefined") ? id : student.class_id;
    if (classIdToLoad) loadClassData(classIdToLoad);
    else setLoading(false);

    studentClassroomService.getSubmittedAssignments(student.id)
      .then(data => setSubmittedAssignments(new Set(data)));

    const interval = setInterval(() => refreshGrades(), 7000);
    return () => clearInterval(interval);
  }, [id]);

  const loadClassData = async (classId: string | number) => {
    try {
      setLoading(true);
      const data = await studentClassroomService.getClassData(classId);
      setCls(data);
      if (data.lessonCategories?.length > 0) {
        const first = data.lessonCategories[0];
        setSelectedCategoryId(first.id || first.Id);
      }
    } catch (err) {
      console.error("שגיאה בטעינת נתוני הכיתה", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGrades = async () => {
    const student = studentClassroomService.getStudentSession();
    if (!student) return;

    try {
      const grades: Grade[] = await studentClassroomService.getGrades(student.id);
      setAssignmentsByLesson(prev => {
        const newState = { ...prev };
        Object.keys(newState).forEach(key => {
          newState[Number(key)] = newState[Number(key)].map((asgn: any) => {
            const found = grades.find((g) => g.assignmentId === (asgn.id || asgn.Id));
            return found ? { ...asgn, myGrade: found.grade, teacherComment: found.teacherComment } : asgn;
          });
        });
        return { ...newState };
      });
    } catch (err) {
      console.error("שגיאה בריענון ציונים:", err);
    }
  };

  const handleToggleAssignments = async (lessonId: number) => {
    if (assignmentsByLesson[lessonId]) {
      setAssignmentsByLesson(prev => { const s = { ...prev }; delete s[lessonId]; return s; });
      return;
    }
    try {
      const data = await studentClassroomService.getAssignmentsByLesson(lessonId);
      setAssignmentsByLesson(prev => ({ ...prev, [lessonId]: data }));
    } catch {
      showToast("שגיאה בטעינת המטלות", "error");
    }
  };

  const handleFileChange = (asgnId: number, file: File | null) => {
    setSelectedFiles(prev => ({ ...prev, [asgnId]: file }));
  };

  const handleSubmit = async (assignmentId: number) => {
    const currentFile = selectedFiles[assignmentId];
    if (!currentFile) { showToast("אנא בחר קובץ לפני השליחה", "error"); return; }

    const student = studentClassroomService.getStudentSession();
    if (!student) return;

    try {
      setIsSubmitting(true);
      await studentClassroomService.submitAssignment(assignmentId, student.id, currentFile);
      showToast("העבודה הוגשה בהצלחה!");
      setSelectedFiles(prev => ({ ...prev, [assignmentId]: null }));
      setSubmittedAssignments(prev => new Set(prev).add(assignmentId));
      await refreshGrades();
    } catch {
      showToast("שגיאה בהגשת העבודה", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return {
    cls, loading, studentName, toast,
    selectedCategoryId, setSelectedCategoryId,
    assignmentsByLesson, submittedAssignments,
    isSubmitting, selectedFiles,
    handleToggleAssignments, handleFileChange,
    handleSubmit, handleLogout,
  };
}