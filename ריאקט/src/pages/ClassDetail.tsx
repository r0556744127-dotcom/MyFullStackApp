import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { useParams } from "react-router-dom";
import CategorySidebar from "../components/ui/CategorySidebar";
import AddLessonForm from "../components/ui/AddLessonForm";
import LessonList from "../components/ui/LessonList";
import SubmissionsModal from "../components/ui/SubmissionsModal";

export default function ClassDetail() {
  const { classId } = useParams();
  const [cls, setCls] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({ titelLesson: "", summary: "", recordingLink: "", date: new Date().toISOString().split('T')[0] });
  const [newAssignment, setNewAssignment] = useState({ AssignmentName: "", File: null as File | null, Title: "", date: new Date().toISOString().split("T")[0] });
  const [showAssignmentForm, setShowAssignmentForm] = useState<number | null>(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);
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

  const addCategory = async () => {
    const trimmed = categoryName.trim();
    if (!trimmed || !classId) return;
    try {
      await apiClient.post("/LessonCategory", { id: 0, lessonName: trimmed, classId: Number(classId) });
      await loadClass();
      setCategoryName("");
      showToast("הקטגוריה נוספה!");
    } catch { showToast("שגיאה בהוספת קטגוריה", "error"); }
  };

  const updateCategory = async (id: number) => {
    try {
      await apiClient.put(`/LessonCategory/${id}`, { name: editCategoryName });
      await loadClass();
      setEditingCategoryId(null);
      showToast("הקטגוריה עודכנה!");
    } catch { showToast("שגיאה בעדכון הקטגוריה", "error"); }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("למחוק קטגוריה?")) return;
    try {
      await apiClient.delete(`/LessonCategory/${id}`);
      setCls({ ...cls, lessonCategories: cls.lessonCategories.filter((c: any) => (c.id || c.Id) !== id) });
      if (selectedCategoryId === id) setSelectedCategoryId(null);
      showToast("קטגוריה נמחקה");
    } catch { showToast("שגיאה במחיקה", "error"); }
  };

  const handleAddLesson = async () => {
    if (!newLesson.titelLesson || !selectedCategoryId) { showToast("חובה לבחור קטגוריה", "error"); return; }
    try {
      await apiClient.post("/Lesson", {
        idLesson: 0, classId: Number(classId), titelLesson: newLesson.titelLesson,
        date: new Date(newLesson.date).toISOString(), teacherId: Number(sessionStorage.getItem("teacherId")),
        lessonCategoryId: Number(selectedCategoryId),
        recordingLink: (newLesson.recordingLink || "").replace(/"/g, ""),
        summary: newLesson.summary || "", assignments: []
      });
      await loadClass();
      setShowAddLesson(false);
      setNewLesson({ titelLesson: "", summary: "", recordingLink: "", date: new Date().toISOString().split('T')[0] });
      showToast("השיעור נוסף!");
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

  const deleteAssignment = async (id: number) => {
    try { await apiClient.delete(`/Assignment/${id}`); await loadClass(); showToast("המטלה נמחקה!"); }
    catch { showToast("שגיאה במחיקת מטלה", "error"); }
  };

  const fetchSubmissions = async (assignmentId: number) => {
    try {
      const res = await apiClient.get(`/submission/assignment/${assignmentId}/submissions`);
      setSubmissions(res.data);
    } catch { showToast("שגיאה בטעינת הגשות", "error"); }
  };

  const updateGrade = async (submissionId: number) => {
    try {
      await apiClient.put(`/submission/grade/${submissionId}`, { grade: Number(gradeInput), teacherComment: commentInput });
      await fetchSubmissions(selectedAssignmentId!);
      setEditingSubmissionId(null);
      setGradeInput(""); setCommentInput("");
      showToast("הציון עודכן!");
    } catch { showToast("שגיאה בעדכון ציון", "error"); }
  };

  const getEmbedUrl = (link: string) => {
    if (!link) return null;
    if (link.includes('youtube.com/watch?v=')) return link.replace('watch?v=', 'embed/');
    if (link.includes('youtu.be/')) return link.replace('youtu.be/', 'youtube.com/embed/');
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
      <CategorySidebar
        className={cls?.name || cls?.className || "כיתה"}
        categories={cls?.lessonCategories || []}
        selectedCategoryId={selectedCategoryId}
        categoryName={categoryName}
        editingCategoryId={editingCategoryId}
        editCategoryName={editCategoryName}
        onSelectCategory={setSelectedCategoryId}
        onCategoryNameChange={setCategoryName}
        onAddCategory={addCategory}
        onEditStart={(id, name) => { setEditingCategoryId(id); setEditCategoryName(name); }}
        onEditSave={updateCategory}
        onEditCancel={() => setEditingCategoryId(null)}
        onEditNameChange={setEditCategoryName}
        onDelete={deleteCategory}
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
              onChange={setNewLesson}
              onSave={handleAddLesson}
              onCancel={() => setShowAddLesson(false)}
            />
          )}

          <LessonList
            lessons={currentLessons}
            showAssignmentForm={showAssignmentForm}
            newAssignment={newAssignment}
            onDeleteLesson={deleteLesson}
            onShowAssignmentForm={setShowAssignmentForm}
            onAssignmentChange={setNewAssignment}
            onAddAssignment={addAssignment}
            onDeleteAssignment={deleteAssignment}
            onViewSubmissions={id => { setSelectedAssignmentId(id); fetchSubmissions(id); setShowSubmissions(true); }}
            getEmbedUrl={getEmbedUrl}
          />
        </div>
      </main>

      {showSubmissions && (
        <SubmissionsModal
          submissions={submissions}
          editingSubmissionId={editingSubmissionId}
          gradeInput={gradeInput}
          commentInput={commentInput}
          onClose={() => setShowSubmissions(false)}
          onEditStart={s => { setEditingSubmissionId(s.submissionId); setGradeInput(s.grade || ""); setCommentInput(s.teacherComment || ""); }}
          onGradeChange={setGradeInput}
          onCommentChange={setCommentInput}
          onSaveGrade={updateGrade}
          onCancelEdit={() => setEditingSubmissionId(null)}
        />
      )}
    </div>
  );
}

