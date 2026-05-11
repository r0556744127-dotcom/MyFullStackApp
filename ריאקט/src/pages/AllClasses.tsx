import { GraduationCap, Loader2 } from "lucide-react"
import { useClasses } from "../components/ui/Useclasses"
import GradeSection2 from "../components/ui/GradeSection2"


const GRADES = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]

export default function Classes() {
    const {
        classes,  loading,
        expandedGrades, expandedClasses,
       editingClassId, editClassName,
        setShowClassForm, setShowStudentForm, 
        setSelectedGrade, setSelectedClassId, setEditingStudent,
        setEditingClassId, setEditClassName
       , handleDeleteClass, handleUpdateClass,
 handleDeleteStudent,
        toggleGrade, toggleClass,
    } = useClasses()

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
        </div>
    )

    return (
        
        <div dir="rtl" className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-50 min-h-screen">

            {/* Header */}
            <header className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">ניהול מבנה בית הספר</h1>
        
                </div>
                <GraduationCap className="w-10 h-10 text-indigo-600" />
            </header>

            {/* Grades */}
            <div className="space-y-4">
                {GRADES.map(gradeName => (
                    <GradeSection2
                        key={gradeName}
                        gradeName={gradeName}
                        gradeClasses={classes.filter(c => String(c.grade) === gradeName)}
                        isExpanded={expandedGrades.includes(gradeName)}
                        expandedClasses={expandedClasses}
                        editingClassId={editingClassId}
                        editClassName={editClassName}
                        onToggleGrade={() => toggleGrade(gradeName)}
                        onToggleClass={toggleClass}
                        onAddClass={() => { setSelectedGrade(gradeName); setShowClassForm(true) }}
                        onEditClassStart={(id, name) => { setEditingClassId(id); setEditClassName(name) }}
                        onEditClassSave={handleUpdateClass}
                        onEditClassCancel={() => setEditingClassId(null)}
                        onEditClassNameChange={setEditClassName}
                        onAddStudent={(classId) => { setSelectedClassId(classId); setShowStudentForm(true) }}
                        onDeleteClass={handleDeleteClass}
                        onEditStudent={setEditingStudent}
                        onDeleteStudent={handleDeleteStudent}
                    />
                ))}
            </div>

            
        </div>
    )
}
// import { useState, useEffect } from "react"
// import { Plus, Users, Trash2, GraduationCap, ChevronDown, ChevronUp, UserPlus, X, Loader2, BookOpen } from "lucide-react"
// import apiClient from "../api/apiClient"
// import { useLocation, useNavigate } from "react-router-dom";
// import { createPageUrl } from "@/utils";

// // --- קבועים וטיפוסים ---
// const COLORS = ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"]
// const GRADES = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]

// type Student = {
//     id: number
//     fullName: string
//     identityNumber: string
//     email: string
// }
// type Staff = {
//     id: number
//     fullName: string
//     identityNumber: string
//     email: string
//     role: number
// }
// type ClassType = {
//     id: number
//     name: string
//     color: string
//     grade: string
//     students: Student[]
// }

// // --- קומפוננטת טופס הוספת תלמיד ---
// function StudentForm({ onSave, onClose }: { onSave: (s: Omit<Student, "id">) => Promise<void>, onClose: () => void }) {
//     const [form, setForm] = useState({ fullName: "", identityNumber: "", email: "" })
//     const [loading, setLoading] = useState(false)

//     const handleSubmit = async () => {
//         if (!form.fullName.trim()) return alert("נא להזין שם מלא")
//         setLoading(true)
//         await onSave(form)
//         setLoading(false)
//     }

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
//             <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-bold flex items-center gap-2">
//                         <UserPlus className="text-indigo-600" /> הוספת תלמיד חדש
//                     </h2>
//                     <button onClick={onClose}><X className="text-gray-400" /></button>
//                 </div>
//                 <div className="space-y-4">
//                     <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="שם מלא *"
//                         value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
//                     <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="מספר זהות"
//                         value={form.identityNumber} onChange={e => setForm({ ...form, identityNumber: e.target.value })} />
//                     <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="אימייל"
//                         value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//                 </div>
//                 <div className="flex gap-2 mt-8">
//                     <button className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"
//                         onClick={handleSubmit} disabled={loading}>
//                         {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "הוסף תלמיד"}
//                     </button>
//                     <button className="flex-1 border rounded-xl py-2 text-gray-600 hover:bg-gray-50" onClick={onClose}>ביטול</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// function EditStudentForm({
//     student,
//     onSave,
//     onClose
// }: {
//     student: Student,
//     onSave: (s: { fullName: string, email: string }) => Promise<void>,
//     onClose: () => void
// }) {
//     const [form, setForm] = useState({
//         fullName: student.fullName,
//         email: student.email
//     });

//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async () => {
//         if (!form.fullName.trim()) return alert("נא להזין שם מלא");
//         setLoading(true);
//         await onSave(form);
//         setLoading(false);
//     };

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" dir="rtl">
//             <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">

//                 {/* כותרת */}
//                 <div className="mb-5">
//                     <h2 className="text-xl font-bold text-gray-800">
//                         עריכת תלמיד
//                     </h2>
//                     <p className="text-sm text-gray-400">
//                         {student.fullName}
//                     </p>
//                 </div>

//                 {/* ת"ז (לא לעריכה) */}
//                 <div className="mb-4">
//                     <label className="text-xs text-gray-500">תעודת זהות</label>
//                     <div className="border rounded-xl px-4 py-2 bg-gray-100 text-gray-500">
//                         {student.identityNumber}
//                     </div>
//                 </div>

//                 {/* שם */}
//                 <div className="mb-4">
//                     <label className="text-xs text-gray-500">שם מלא</label>
//                     <input
//                         className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
//                         value={form.fullName}
//                         onChange={e => setForm({ ...form, fullName: e.target.value })}
//                     />
//                 </div>

//                 {/* אימייל */}
//                 <div className="mb-6">
//                     <label className="text-xs text-gray-500">אימייל</label>
//                     <input
//                         className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
//                         value={form.email}
//                         onChange={e => setForm({ ...form, email: e.target.value })}
//                     />
//                 </div>

//                 {/* כפתורים */}
//                 <div className="flex gap-2">
//                     <button
//                         onClick={handleSubmit}
//                         className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
//                         disabled={loading}
//                     >
//                         {loading ? "שומר..." : "שמור שינויים"}
//                     </button>

//                     <button
//                         onClick={onClose}
//                         className="flex-1 border py-2 rounded-xl text-gray-600 hover:bg-gray-50"
//                     >
//                         ביטול
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// const extractGrade = (name: string): string => {
//     const match = name.match(/[א-ת]/);
//     return match ? match[0] : "";
// };

// // --- קומפוננטה ראשית ---
// export default function AllClasses() {
//     const location = useLocation();
//     const navigate = useNavigate();
// const [editingClassId, setEditingClassId] = useState<number | null>(null);
// const [editClassName, setEditClassName] = useState("");
//     const [classes, setClasses] = useState<ClassType[]>([])
//     const [loading, setLoading] = useState(true)
//     const [expandedGrades, setExpandedGrades] = useState<string[]>(["א"])
//     const [expandedClasses, setExpandedClasses] = useState<number[]>([])
    
//     // Staff management states
//     const [allStaff, setAllStaff] = useState<Staff[]>([])
//     const [showStaffList, setShowStaffList] = useState(false)

//     // Modals visibility states
//     const [showClassForm, setShowClassForm] = useState(false)
//     const [showStudentForm, setShowStudentForm] = useState(false)
//     const [showStaffForm, setShowStaffForm] = useState(false)

//     const [selectedGrade, setSelectedGrade] = useState("")
//     const [selectedClassId, setSelectedClassId] = useState<number | null>(null)

//     useEffect(() => {
//         const userType = sessionStorage.getItem("user_type");
//         // if (userType !== "admin") {
//         //     navigate("/"); 
//         //     return;
//         // }
//         fetchClasses();
//         fetchStaff(); 
//     }, [location.pathname, navigate]);

//     const fetchClasses = async () => {
//         try {
//             const res = await apiClient.get("/ClassRoom");
//             const data = Array.isArray(res.data) ? res.data : [];
//             const mapped: ClassType[] = data.map((c: any) => ({
//                 id: c.id ?? c.Id,
//                 name: c.name ?? c.Name ?? "",
//                 color: c.color ?? c.Color ?? "#4F46E5",
//                 grade: extractGrade(c.name ?? c.Name ?? ""),
//                 students: [] 
//             }));
//             setClasses(mapped);
//         } catch (err) {
//             console.error("Error fetching classes:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchStaff = async () => {
//         try {
//             const res = await apiClient.get("/Staff");
//             setAllStaff(Array.isArray(res.data) ? res.data : []);
//         } catch (err) {
//             console.error("Error fetching staff:", err);
//         }
//     };

//     const fetchClassDetails = async (classId: number) => {
//         try {
//             const res = await apiClient.get(`/ClassRoom/${classId}`);
//             const detail = res.data;
//             setClasses(prev => prev.map(c =>
//                 c.id === classId ? { ...c, students: detail.students ?? [] } : c
//             ));
//         } catch (err) { console.error(err); }
//     };


//     const toggleGrade = (grade: string) =>
//         setExpandedGrades(prev => prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade])

//     const toggleClass = (classId: number) => {
//         const isOpening = !expandedClasses.includes(classId)
//         setExpandedClasses(prev => prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId])
//         if (isOpening) fetchClassDetails(classId)
//     }

//     if (loading) return (
//         <div className="flex items-center justify-center min-h-screen">
//             <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
//         </div>
//     )

//     return (
//         <div dir="rtl" className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-50 min-h-screen">
//             <header className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
//                 <div>
//                     <h1 className="text-3xl font-black text-gray-900">ניהול מבנה בית הספר</h1>
                   
//                 </div>
//                 <GraduationCap className="w-10 h-10 text-indigo-600" />
//             </header>

//             <div className="space-y-4">
//                 {GRADES.map(gradeName => {
//                     const gradeClasses = classes.filter(c => String(c.grade) === gradeName)
//                     const isExpanded = expandedGrades.includes(gradeName)
//                     const totalStudents = gradeClasses.reduce((sum, c) => sum + c.students.length, 0)
                    
//                     return (
//                         <div key={gradeName} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//                             <div onClick={() => toggleGrade(gradeName)}
//                                 className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
//                                         {gradeName}
//                                     </div>
//                                     <div>
//                                         <h2 className="text-xl font-bold text-gray-800">שכבת {gradeName}'</h2>
//                                         <p className="text-xs text-gray-400">{gradeClasses.length} כיתות </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3">
                                
//                                     {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
//                                 </div>
//                             </div>
                            
//                             {isExpanded && (
//                                 <div className="p-4 bg-gray-50 space-y-3">
//                                     {gradeClasses.length === 0 ? (
//                                         <p className="text-center text-gray-400 py-4">אין כיתות בשכבה זו</p>
//                                     ) : (
//                                         gradeClasses.map(cls => (
//                                             <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//                                                 <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
//                                                     onClick={() => toggleClass(cls.id)}>
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-2 h-8 rounded-full" style={{ background: cls.color }} />
//                                                         <div>
// {editingClassId === cls.id ? (
//     <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
//         <input
//             value={editClassName}
//             onChange={e => setEditClassName(e.target.value)}
//             className="border rounded-lg px-2 py-1 text-sm w-32"
//             autoFocus
//         />
      
//     </div>
// ) : (
//     <span className="font-bold text-gray-800">{cls.name}</span>
// )}                                                           
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         <a href={createPageUrl("classDetailTeacher") + `/${cls.id}`}
//                                                             className="flex items-center gap-1.5 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium">
//                                                             <BookOpen className="w-4 h-4" /> פתח כיתה
//                                                         </a>
                                                      
//                                                     </div>
//                                                 </div>
                                               
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )
//                 })}
//             </div>

        
//         </div>
//     )
// }
