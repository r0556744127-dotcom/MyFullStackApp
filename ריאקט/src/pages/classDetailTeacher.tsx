import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { useParams } from "react-router-dom";
import ClassSidebar from "../components/ui/ClassSidebar";
import AddLessonForm from "../components/ui/AddLessonForm";
import LessonCard from "../components/ui/LessonCard";

export default function ClassDetail1() {
  const { classId } = useParams();
  const [cls, setCls] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [newLesson, setNewLesson] = useState({ titelLesson: "", summary: "", recordingLink: "", date: new Date().toISOString().split('T')[0] });
  const [newAssignment, setNewAssignment] = useState({ AssignmentName: "", File: null as File | null, Title: "", date: new Date().toISOString().split("T")[0] });
  const [showAssignmentForm, setShowAssignmentForm] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [viewingAssignmentId, setViewingAssignmentId] = useState<number | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<number | null>(null);
  const [editAssignmentData, setEditAssignmentData] = useState({ title: "", dueDate: "", newFile: null as File | null });
  const [editingSubmissionId, setEditingSubmissionId] = useState<number | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => { if (classId) loadClass(); }, [classId]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadClass = async () => {
    try {
      const res = await apiClient.get(`/ClassRoom/${classId}`);
      setCls(res.data);
      if (res.data.lessonCategories?.length > 0 && !selectedCategoryId) {
        const first = res.data.lessonCategories[0];
        setSelectedCategoryId(first.id || first.Id);
      }
    } catch { showToast("שגיאה בטעינת הנתונים", "error"); }
    finally { setLoading(false); }
  };
  const fetchSubmissions = async (assignmentId: number) => {
    try {
      const res = await apiClient.get(`/submission/assignment/${assignmentId}/submissions`);
      setSubmissions(res.data);
    } catch { showToast("שגיאה בטעינת הגשות", "error"); }
  };
  const handleAddLesson = async () => {
    if (!newLesson.titelLesson || !selectedCategoryId) { showToast("חובה למלא נושא ולבחור קטגוריה", "error"); return; }
    let link = newLesson.recordingLink.trim();
    try {
      if (videoFile) {
        if (videoFile.size > 1024 * 1024 * 1024) { showToast("הקובץ גדול מדי", "error"); return; }
        const formData = new FormData();
        formData.append("file", videoFile);
        const res = await apiClient.post("/Lesson/upload-video", formData, { headers: { "Content-Type": "multipart/form-data" } });
        if (!res.data?.url) throw new Error("Upload failed");
        link = res.data.url;
      }
      if (!videoFile && !link) { showToast("חייב להוסיף קישור או קובץ", "error"); return; }
      await apiClient.post("/Lesson", {
        idLesson: 0, classId: Number(classId), titelLesson: newLesson.titelLesson,
        date: new Date(newLesson.date).toISOString(), teacherId: Number(sessionStorage.getItem("teacherId")),
        lessonCategoryId: Number(selectedCategoryId), recordingLink: link,
        summary: newLesson.summary || "", assignments: []
      });
      await loadClass();
      setShowAddLesson(false);
      setVideoFile(null);
      setNewLesson({ titelLesson: "", summary: "", recordingLink: "", date: new Date().toISOString().split("T")[0] });
      showToast("השיעור נוסף בהצלחה!");
    } catch { showToast("שגיאה בשמירת השיעור", "error"); }
  };

  const deleteLesson = async (id: number) => {
    if (!confirm("למחוק שיעור?")) return;
    try { await apiClient.delete(`/Lesson/${id}`); await loadClass(); showToast("השיעור נמחק"); }
    catch { showToast("שגיאה במחיקה", "error"); }
  };

  const addAssignment = async (lessonId: number) => {
    try {
      const formData = new FormData();
      formData.append("AssignmentName", newAssignment.AssignmentName);
      formData.append("Title", newAssignment.Title);
      formData.append("ClassId", String(classId));
      formData.append("LessonId", String(lessonId));
      formData.append("DueDate", new Date(newAssignment.date).toISOString());
      if (newAssignment.File) formData.append("File", newAssignment.File);
      await apiClient.post("/Assignment/teacher/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
      await loadClass();
      setShowAssignmentForm(null);
      setNewAssignment({ AssignmentName: "", File: null, Title: "", date: new Date().toISOString().split("T")[0] });
      showToast("המטלה נוספה!");
    } catch { showToast("שגיאה בהוספת מטלה", "error"); }
  };

  const updateAssignment = async (assignmentId: number) => {
    try {
      const formData = new FormData();
      formData.append("Title", editAssignmentData.title);
      formData.append("DueDate", new Date(editAssignmentData.dueDate).toISOString());
      if (editAssignmentData.newFile) formData.append("NewFile", editAssignmentData.newFile);
      await apiClient.put(`/Assignment/${assignmentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      await loadClass();
      setEditingAssignment(null);
      showToast("המטלה עודכנה!");
    } catch { showToast("שגיאה בעדכון המטלה", "error"); }
  };

  const deleteAssignment = async (assignmentId: number) => {
    try { await apiClient.delete(`/Assignment/${assignmentId}`); await loadClass(); showToast("המטלה נמחקה!"); }
    catch { showToast("שגיאה במחיקת מטלה", "error"); }
  };

  const loadSubmissions = async (assignmentId: number) => {
    try {
      setSelectedAssignmentId(assignmentId);
      const res = await apiClient.get(`/Submission/assignment/${assignmentId}/submissions`);
      setSubmissions(res.data);
      setViewingAssignmentId(assignmentId);
    } catch { showToast("שגיאה בטעינת הגשות", "error"); }
  };

  const updateGrade = async (submissionId: number) => {
    try {
      await apiClient.put(`/submission/grade/${submissionId}`, { grade: Number(gradeInput), teacherComment: commentInput });
      const res = await apiClient.get(`/submission/assignment/${selectedAssignmentId}/submissions`);
      setSubmissions(res.data);
      setEditingSubmissionId(null);
      setGradeInput(""); setCommentInput("");
      showToast("הציון עודכן!");
    } catch { showToast("שגיאה בעדכון ציון", "error"); }
  };
const viewSubmissionFile = async (submissionId: number, fileName?: string) => {
  try {
    const res = await apiClient.get(`/Submission/download/${submissionId}`, {
      responseType: 'blob', 
    });

    console.log("Blob Size (bytes):", res.data.size);
    console.log("Blob Type:", res.data.type);

    if (res.data.size === 0) {
        showToast("הקובץ ריק או לא נמצא בשרת", "error");
        return;
    }

    // יצירת כתובת URL זמנית עבור הקובץ
    const fileUrl = window.URL.createObjectURL(new Blob([res.data], { type: res.data.type || 'application/octet-stream' }));
    
    // --- הקוד החדש שמתחיל הורדה במקום לפתוח עמוד חדש ---
    const link = document.createElement('a');
    link.href = fileUrl;
    // אם השרת שלח שם קובץ נשתמש בו, אחרת ניתן שם ברירת מחדל עם סיומת כללית
    link.download = fileName || `submission_${submissionId}.file`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // --------------------------------------------------

    setTimeout(() => window.URL.revokeObjectURL(fileUrl), 10000);
    
  } catch (error) {
    console.error("Error downloading file:", error);
    showToast("שגיאה בהורדת הקובץ.", "error");
  }
};
  const getEmbedUrl = (link: any) => {
    if (!link) return null;
    const linkStr = typeof link === 'string' ? link : link?.absoluteUri || String(link);
    if (!linkStr || linkStr === 'null' || linkStr.startsWith('file:///')) return null;
    if (linkStr.includes('youtube.com/watch?v=')) return linkStr.replace('watch?v=', 'embed/');
    if (linkStr.includes('youtu.be/')) return linkStr.replace('youtu.be/', 'youtube.com/embed/');
    return null;
  };

  if (loading) return <div className="p-20 text-center font-bold">טוען נתונים...</div>;

  const currentLessons = cls?.lessons?.filter((l: any) =>
    Number(l.lessonCategoryId || l.LessonCategoryId) === Number(selectedCategoryId)
  ) || [];

  const selectedCategoryName = cls?.lessonCategories?.find(
    (c: any) => Number(c.id || c.Id) === Number(selectedCategoryId)
  )?.lessonName;

  return (
    <div dir="rtl" className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <ClassSidebar
        className={cls?.name || cls?.className || "כיתה"}
        categories={cls?.lessonCategories || []}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <main className="flex-1 p-10 overflow-y-auto">
        {toast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full">
            {toast.msg}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-10">{selectedCategoryName || "בחר קטגוריה"}</h1>

          <button onClick={() => setShowAddLesson(true)}
            className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-xl">
            ➕ הוספת שיעור
          </button>

          {showAddLesson && (
            <AddLessonForm
              newLesson={newLesson}
              videoFile={videoFile}
              onChange={setNewLesson}
              onVideoChange={setVideoFile}
              onSave={handleAddLesson}
              onCancel={() => setShowAddLesson(false)}
            />
          )}

          <div className="space-y-8">
            {currentLessons.map((l: any) => (
              <LessonCard
                key={l.idLesson}
                lesson={l}
                showAssignmentForm={showAssignmentForm}
                newAssignment={newAssignment}
                viewingAssignmentId={viewingAssignmentId}
                editingAssignment={editingAssignment}
                editAssignmentData={editAssignmentData}
                submissions={submissions}
                editingSubmissionId={editingSubmissionId}
                gradeInput={gradeInput}
                commentInput={commentInput}
                getEmbedUrl={getEmbedUrl}
                onDeleteLesson={deleteLesson}
                onShowAssignmentForm={setShowAssignmentForm}
                onAssignmentChange={setNewAssignment}
                onAddAssignment={addAssignment}
                onViewSubmissions={loadSubmissions}
                onEditAssignmentStart={asn => { setEditingAssignment(asn.id); setEditAssignmentData({ title: asn.title || asn.Title || "", dueDate: asn.dueDate?.split('T')[0] || "", newFile: null }); }}
                onEditAssignmentChange={setEditAssignmentData}
                onEditAssignmentSave={updateAssignment}
                onEditAssignmentCancel={() => setEditingAssignment(null)}
                onDeleteAssignment={deleteAssignment}
                onGradeEditStart={sub => { setEditingSubmissionId(sub.submissionId); setGradeInput(sub.grade?.toString() || ""); setCommentInput(sub.teacherComment || ""); }}
                onGradeChange={setGradeInput}
                onCommentChange={setCommentInput}
                onSaveGrade={updateGrade}
                onCancelGradeEdit={() => setEditingSubmissionId(null)}
                onCloseSubmissions={() => setViewingAssignmentId(null)}
              onViewSubmissionFile={viewSubmissionFile}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
