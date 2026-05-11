import { ChevronDown, ChevronUp, Plus } from "lucide-react"
type Student = {
    id: number
    fullName: string
    identityNumber: string
    email: string
}

type ClassType = {
    id: number
    name: string
    color: string
    grade: string
    students: Student[]
}
import ClassCard2 from "./ClassCard2"

type Props = {
    gradeName: string
    gradeClasses: ClassType[]
    isExpanded: boolean
    expandedClasses: number[]
    editingClassId: number | null
    editClassName: string
    onToggleGrade: () => void
    onToggleClass: (classId: number) => void
    onAddClass: () => void
    onEditClassStart: (classId: number, name: string) => void
    onEditClassSave: (classId: number) => void
    onEditClassCancel: () => void
    onEditClassNameChange: (name: string) => void
    onAddStudent: (classId: number) => void
    onDeleteClass: (classId: number) => void
    onEditStudent: (student: Student) => void
    onDeleteStudent: (classId: number, studentId: number) => void
    isAdmin: boolean  // ← הוסף

}

export default function GradeSection({
    gradeName, gradeClasses, isExpanded, expandedClasses,
    editingClassId, editClassName,
    onToggleGrade, onToggleClass, onAddClass,
    onEditClassStart, onEditClassSave, onEditClassCancel, onEditClassNameChange,
    onAddStudent, onDeleteClass, onEditStudent, onDeleteStudent,isAdmin
}: Props) {
    const totalStudents = gradeClasses.reduce((sum, c) => sum + c.students.length, 0)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Grade Header */}
            <div onClick={onToggleGrade}
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                        {gradeName}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">שכבת {gradeName}'</h2>
                        <p className="text-xs text-gray-400">
                            {gradeClasses.length} כיתות · {totalStudents} תלמידים
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium"
                        onClick={e => { e.stopPropagation(); onAddClass() }}>
                        <Plus className="w-4 h-4" /> הוספת כיתה
                    </button>
                    {isExpanded
                        ? <ChevronUp className="text-gray-400" />
                        : <ChevronDown className="text-gray-400" />}
                </div>
            </div>

            {/* Classes List */}
            {isExpanded && (
                <div className="p-4 bg-gray-50 space-y-3">
                    {gradeClasses.length === 0 ? (
                        <p className="text-center text-gray-400 py-4">אין כיתות בשכבה זו</p>
                    ) : (
                        gradeClasses.map(cls => (
                            <ClassCard2
                                key={cls.id}
                                cls={cls}
                                isExpanded={expandedClasses.includes(cls.id)}
                                isEditing={editingClassId === cls.id}
                                editClassName={editClassName}
                                onToggle={() => onToggleClass(cls.id)}
                                onEditStart={() => onEditClassStart(cls.id, cls.name)}
                                onEditSave={() => onEditClassSave(cls.id)}
                                onEditCancel={onEditClassCancel}
                                onEditNameChange={onEditClassNameChange}
                                onAddStudent={() => onAddStudent(cls.id)}
                                onDelete={() => onDeleteClass(cls.id)}
                                onEditStudent={onEditStudent}
                                onDeleteStudent={onDeleteStudent}
                                isAdmin={isAdmin}  // ← הוסף

                            
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}