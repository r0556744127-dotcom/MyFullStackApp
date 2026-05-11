
import { GraduationCap, UserPlus, Users, Loader2 } from "lucide-react"
import { useClasses } from "../components/ui/Useclasses"
import GradeSection from "../components/ui/GradeSection"
import Classform2 from "../components/ui/Classform2"
import Studentform2 from "../components/ui/Studentform2"
import Staffform2 from "../components/ui/Staffform2"
import Stafflistmodal2 from "../components/ui/Stafflistmodal2"
import Editstudentform2 from "../components/ui/Editstudentform2"

const GRADES = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]

export default function Classes() {
    const isAdmin = sessionStorage.getItem("user_type") === "admin"

    const {
        classes, allStaff, loading,
        expandedGrades, expandedClasses,
        showClassForm, showStudentForm, showStaffForm, showStaffList,
        selectedGrade, editingStudent, editingClassId, editClassName,
        setShowClassForm, setShowStudentForm, setShowStaffForm, setShowStaffList,
        setSelectedGrade, setSelectedClassId, setEditingStudent,
        setEditingClassId, setEditClassName,
        handleAddClass, handleDeleteClass, handleUpdateClass,
        handleAddStudent, handleUpdateStudent, handleDeleteStudent,
        handleAddTeacher, handleDeleteStaff, handleUpdateStaff,
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
                    <div className="flex gap-4 mt-1 items-center">
                        <p className="text-gray-400">
                            {classes.length} כיתות · {classes.reduce((sum, c) => sum + c.students.length, 0)} תלמידים
                        </p>
                        <button
                            onClick={() => setShowStaffForm(true)}
                            className="text-indigo-600 font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors text-sm">
                            <UserPlus className="w-4 h-4" /> הוספת מורה
                        </button>
                        <button
                            onClick={() => setShowStaffList(true)}
                            className="text-gray-600 font-bold flex items-center gap-1 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors text-sm border">
                            <Users className="w-4 h-4" /> ניהול מורות
                        </button>
                    </div>
                </div>
                <GraduationCap className="w-10 h-10 text-indigo-600" />
            </header>

            {/* Grades */}
            <div className="space-y-4">
                {GRADES.map(gradeName => (
                    <GradeSection
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
                      isAdmin={sessionStorage.getItem("user_type") === "admin"}

                        />
                ))}
            </div>

            {/* Modals */}
            {editingStudent && (
                <Editstudentform2
                    student={editingStudent}
                    onSave={(data) => handleUpdateStudent(editingStudent.id, data)}
                    onClose={() => setEditingStudent(null)}
                />
            )}
            {showClassForm && (
                <Classform2
                    initialGrade={selectedGrade}
                    onSave={handleAddClass}
                    onClose={() => setShowClassForm(false)}
                />
            )}
            {showStudentForm && (
                <Studentform2
                    onSave={handleAddStudent}
                    onClose={() => setShowStudentForm(false)}
                />
            )}
            {showStaffForm && (
                <Staffform2
                    onSave={handleAddTeacher}
                    onClose={() => setShowStaffForm(false)}
                />
            )}
            {showStaffList && (
                <Stafflistmodal2
                    staff={allStaff}
                    onDelete={handleDeleteStaff}
                    onClose={() => setShowStaffList(false)}
                    onUpdate={handleUpdateStaff}
                />
            )}
        </div>
    )
}
