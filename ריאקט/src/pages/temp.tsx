import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { useParams } from "react-router-dom";
import { Trash2, Plus, PlayCircle, Calendar } from "lucide-react";

export default function ClassDetail() {
  const [showAssignmentForm, setShowAssignmentForm] = useState<number | null>(null);
const [selectedLesson, setSelectedLesson] =  useState<any | null>(null);

  const { classId } = useParams();
  const [cls, setCls] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [createdLessonId, setCreatedLessonId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({
    titelLesson: "",
    summary: "",
    recordingLink: "",
    date: new Date().toISOString().split('T')[0]
  });
// const payload = { id: 0, AssignmentName: trimmed, ClassId: Number(classId), File:,DueDate:new Date(newLesson.date).toISOString(),
// Title,LessonId};

 const [newAssignment, setNewAssignment] = useState({
    AssignmentName: "",
  File: null as File | null,
    Title: "",
  date: new Date().toISOString().split("T")[0]
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => { if (classId) loadClass(); }, [classId]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadClass = async () => {
    try {
      const res = await apiClient.get(`/ClassRoom/${classId}`);
      console.log(res.data)
      setCls(res.data);

      if (res.data.lessonCategories?.length > 0 && !selectedCategoryId) {
        const firstCat = res.data.lessonCategories[0];
        setSelectedCategoryId(firstCat.id || firstCat.Id);
      }
    } catch { showToast("שגיאה בטעינת הנתונים", "error"); }
    finally { setLoading(false); }
  };

  const addCategory = async () => {
    const trimmed = categoryName.trim();
    if (!trimmed || !classId) return;
    try {
      const payload = { id: 0, lessonName: trimmed, classId: Number(classId) };
      await apiClient.post("/LessonCategory", payload);
      await loadClass();
      setCategoryName("");
      showToast("הקטגוריה נוספה!");
    } catch { showToast("שגיאה בהוספת קטגוריה", "error"); }
  };
  const addAssignment = async (lessonId: number) => {
  try {
    const formData = new FormData();

    formData.append("AssignmentName", newAssignment.AssignmentName);
    formData.append("Title", newAssignment.Title);
    formData.append("ClassId", String(classId));
    formData.append("LessonId", String(lessonId));

    // חשוב: Date חייב להיות ISO
    formData.append("DueDate", new Date(newAssignment.date).toISOString());

    // קובץ
    if (newAssignment.File) {
      formData.append("File", newAssignment.File);
    }

    console.log("FORM DATA:", [...formData.entries()]);

    await apiClient.post("/Assignment/teacher/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    await loadClass();
    setShowAssignmentForm(null);

    setNewAssignment({
      AssignmentName: "",
      File: null,
      Title: "",
      date: new Date().toISOString().split("T")[0]
    });

    showToast("המטלה נוספה!");
  } catch (err) {
    console.log(err);
    showToast("שגיאה בהוספת מטלה", "error");
  }
};
  
  const deleteCategory = async (id: number) => {
    if (!confirm("למחוק קטגוריה?")) return;
    try {
      await apiClient.delete(`/LessonCategory/${id}`);
      setCls({ ...cls, lessonCategories: cls.lessonCategories.filter((c:any) => (c.id || c.Id) !== id) });
      if (selectedCategoryId === id) setSelectedCategoryId(null);
      showToast("קטגוריה נמחקה");
    } catch { showToast("שגיאה במחיקה", "error"); }
  };
const getLessonDetail = async (id: number) => {
    try {
      const getDetail =await apiClient.get(`/Lesson/${id}`);
    console.log(getDetail.data);
        setSelectedLesson(getDetail.data);
console.log(selectedLesson);
    } catch { showToast("שגיאה בקבלה", "error"); }
  };
  const handleAddLesson = async () => {
    if (!newLesson.titelLesson || !selectedCategoryId) {
      showToast("חובה לבחור קטגוריה", "error");
      return;
    }

    try {
      const payload = {
        idLesson: 0,
        classId: Number(classId),
        titelLesson: newLesson.titelLesson,
        date: new Date(newLesson.date).toISOString(),
        teacherId: Number(sessionStorage.getItem("teacherId")),
        lessonCategoryId: Number(selectedCategoryId),
        recordingLink: (newLesson.recordingLink || "").replace(/"/g, ""),
        summary: newLesson.summary || "",
          assignments: [] // 👈 זה הפתרון המהיר

      };
      
      console.log(payload);
      await apiClient.post("/Lesson", payload);
     setCreatedLessonId(payload.idLesson);
      
      await loadClass();

      setShowAddLesson(false);
      setNewLesson({
        titelLesson: "",
        summary: "",
        recordingLink: "",
        date: new Date().toISOString().split('T')[0]
      });

      showToast("השיעור נוסף בהצלחה!");
    } catch {
      showToast("שגיאה בשמירת השיעור", "error");
    }
  };

  const deleteLesson = async (id: number) => {
    if (!confirm("למחוק שיעור?")) return;
    try {
      await apiClient.delete(`/Lesson/${id}`);
      await loadClass();
      showToast("השיעור נמחק");
    } catch { showToast("שגיאה במחיקה", "error"); }
  };

  const getEmbedUrl = (link: string) => {
    if (!link) return null;
    if (link.includes('youtube.com/watch?v=')) return link.replace('watch?v=', 'embed/');
    if (link.includes('youtu.be/')) return link.replace('youtu.be/', 'youtube.com/embed/');
    return null;
  };

  if (loading) return <div className="p-20 text-center font-bold">טוען נתונים...</div>;

  const currentLessons = cls?.lessons?.filter((l: any) => {
    const lCatId = l.lessonCategoryId || l.LessonCategoryId;
    return Number(lCatId) === Number(selectedCategoryId);
  }) || [];

  const selectedCategoryName = cls?.lessonCategories?.find((c:any) => Number(c.id || c.Id) === Number(selectedCategoryId))?.lessonName;

  return (
    <div dir="rtl" className="flex h-screen bg-slate-50 font-sans text-slate-900">

      {/* Sidebar */}
      <aside className="w-80 bg-white border-l p-6 shadow-sm flex flex-col">

        <h2 className="text-2xl font-black mb-2 text-indigo-700">
          {cls?.name || cls?.className || "כיתה"}
        </h2>

        <p className="text-[10px] text-slate-400 mb-8 font-medium uppercase tracking-wider">
          ניהול קטגוריות
        </p>

        <div className="mb-8 p-4 bg-indigo-50/50 rounded-2xl">
          <input
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            className="border rounded-xl p-2.5 w-full mb-2"
            placeholder="קטגוריה חדשה..."
          />
          <button onClick={addCategory} className="w-full bg-indigo-600 text-white py-2 rounded-xl">
            הוסף קטגוריה
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {cls?.lessonCategories?.map((c: any) => {
            const catId = c.id || c.Id;
            const isActive = Number(selectedCategoryId) === Number(catId);

            return (
              <div
                key={catId}
                onClick={() => setSelectedCategoryId(catId)}
                className={`p-4 rounded-2xl cursor-pointer flex justify-between items-center ${
                  isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'
                }`}
              >
                <span className="font-bold truncate">{c.lessonName}</span>

                <button
                  onClick={(e) => { e.stopPropagation(); deleteCategory(catId); }}
                  className="text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto">

        {toast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full">
            {toast.msg}
          </div>
        )}

        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-black mb-10">
            {selectedCategoryName || "בחר קטגוריה"}
          </h1>
          
<button
  onClick={() => setShowAddLesson(true)}
  className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-xl"
>
  ➕ הוספת שיעור
</button>
          {showAddLesson && (
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl mb-12 border border-slate-100 animate-in slide-in-from-top duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="נושא השיעור" className="w-full border-2 p-4 rounded-2xl bg-slate-50 outline-none focus:border-indigo-400" value={newLesson.titelLesson} onChange={e=>setNewLesson({...newLesson, titelLesson: e.target.value})} />
                <input type="date" className="w-full border-2 p-4 rounded-2xl bg-slate-50 outline-none focus:border-indigo-400" value={newLesson.date} onChange={e=>setNewLesson({...newLesson, date: e.target.value})} />
                <input placeholder="קישור להקלטה (יוטיוב, דרייב וכו')" className="md:col-span-2 w-full border-2 p-4 rounded-2xl bg-slate-50 outline-none focus:border-indigo-400" value={newLesson.recordingLink} onChange={e=>setNewLesson({...newLesson, recordingLink: e.target.value})} />
                <textarea placeholder="סיכום השיעור" className="md:col-span-2 w-full border-2 p-4 rounded-2xl bg-slate-50 h-32 outline-none focus:border-indigo-400" value={newLesson.summary} onChange={e=>setNewLesson({...newLesson, summary: e.target.value})} />
              </div>
              <button onClick={handleAddLesson} className="mt-8 w-full bg-emerald-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl">שמור שיעור</button>
            </div>
          )}


          {/* LESSONS */}
          <div className="space-y-8">

            {currentLessons.map((l: any) => {
              const lId = l.idLesson || l.IdLesson;
              const ytEmbed = getEmbedUrl(l.recordingLink || l.RecordingLink);

              return (
                <div key={lId} className="bg-white p-8 rounded-2xl shadow relative">

                  {/* HEADER + NEW BUTTON */}
                  <div className="flex justify-between items-start mb-6">


                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Calendar size={14}/>
                      {new Date(l.date || l.Date).toLocaleDateString('he-IL')}
                    </span>

                    <div className="flex items-center gap-2">

                   

                      {/* מחיקה */}
                      <button onClick={() => deleteLesson(lId)} className="text-red-500">
                        <Trash2 size={18}/>
                      </button>
<button
  onClick={() => getLessonDetail(lId)}
  className="text-indigo-600 hover:text-indigo-800 text-sm font-bold"
>
  פרטי שיעור
</button>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    {l.titelLesson || l.TitelLesson}
                  </h3>

                  <p className="text-gray-500 mb-4">
                    {l.summary || l.Summary}
                  </p>

                  {ytEmbed ? (
                    <iframe className="w-full h-64 rounded-xl" src={ytEmbed} />
                  ) : (
                    l.recordingLink && (
                      <a href={l.recordingLink} target="_blank" className="text-blue-600">
                        צפייה בהקלטה
                      </a>
                    )
                  )}
                  {/* כפתור + טופס מטלה */}
<div className="mt-4 flex justify-end">
  <button
    onClick={() => setShowAssignmentForm(lId)}
    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-sm hover:bg-indigo-600 hover:text-white"
  >
    <Plus size={14} />
    הוספת מטלה
  </button>
</div>

{showAssignmentForm === lId && (
  <div className="mt-4 p-4 bg-slate-50 rounded-xl border">

    <input
      placeholder="כותרת מטלה"
      value={newAssignment.AssignmentName}
      onChange={e =>
        setNewAssignment({ ...newAssignment, AssignmentName: e.target.value })
      }
      className="border p-2 w-full mb-2"
    />

    <input
      placeholder="כותרת"
      value={newAssignment.Title}
      onChange={e =>
        setNewAssignment({ ...newAssignment, Title: e.target.value })
      }
      className="border p-2 w-full mb-2"
    />

    <input
      type="date"
      value={newAssignment.date}
      onChange={e =>
        setNewAssignment({ ...newAssignment, date: e.target.value })
      }
      className="border p-2 w-full mb-2"
    />

   <input
  type="file"
  onChange={(e) =>
    setNewAssignment({
      ...newAssignment,
      File: e.target.files ? e.target.files[0] : null
    })
  }
  className="border p-2 w-full mb-2"
/>
    <div className="flex gap-2">
      <button
        onClick={() => addAssignment(lId)}
        className="bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        שמור מטלה
      </button>

      <button
        onClick={() => setShowAssignmentForm(null)}
        className="bg-gray-300 px-4 py-2 rounded-xl"
      >
        ביטול
      </button>
    </div>

  </div>
)}

                </div>
              );
            })}

          </div>
          {selectedLesson && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-2xl w-[500px] relative">

      <button
        onClick={() => setSelectedLesson(null)}
        className="absolute top-2 left-2"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-3">
        {selectedLesson.titelLesson}
      </h2>

      <p>{selectedLesson.summary}</p>

    </div>

  </div>
)}
        </div>
      </main>
      
    </div>
  );
}