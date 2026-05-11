import { ChevronDown, ChevronUp, Users, UserPlus, BookOpen, Trash2 } from "lucide-react"
import type{ ClassType, Student } from "./types"
import { createPageUrl } from "@/utils"
import StudentsTable from "./StudentsTable"

type Props = {
    cls: ClassType
    isExpanded: boolean
    isEditing: boolean
    editClassName: string
    onToggle: () => void
    onEditStart: () => void
    onEditSave: () => void
    onEditCancel: () => void
    onEditNameChange: (name: string) => void
    onAddStudent: () => void
    onDelete: () => void
    onEditStudent: (student: Student) => void
    onDeleteStudent: (classId: number, studentId: number) => void
    isAdmin: boolean  // ← הוסף כאן

}

export default function ClassCard2({
    cls, isExpanded, isEditing, editClassName,
    onToggle, onEditStart, onEditSave, onEditCancel, onEditNameChange,
    onAddStudent, onDelete, onEditStudent, onDeleteStudent,    isAdmin  // ← הוסף כאן

}: Props) {
        console.log("Is Admin:", isAdmin);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50" onClick={onToggle}>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full" style={{ background: cls.color }} />
                    <div>
                        {isEditing ? (
                            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                <input
                                    value={editClassName}
                                    onChange={e => onEditNameChange(e.target.value)}
                                    className="border rounded-lg px-2 py-1 text-sm w-32"
                                    autoFocus
                                />
                                <button onClick={onEditSave}
                                    className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-lg">
                                    שמור
                                </button>
                                <button onClick={onEditCancel}
                                    className="text-xs bg-gray-300 px-2 py-1 rounded-lg">
                                    ביטול
                                </button>
                            </div>
                        ):(
                            <span className="font-bold text-gray-800">{cls.name}</span>
                        )}
                        <p className="text-xs text-gray-400">
                            <Users className="w-3 h-3 inline ml-1" />
                            {cls.students.length} תלמידים
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}> 
                    <a href={createPageUrl(isAdmin ? "ClassDetail":"classDetailTeacher") + `/${cls.id}`}
                        className="flex items-center gap-1.5 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium">
                        <BookOpen className="w-4 h-4" /> פתח כיתה
                    </a>
                    <button
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg"
                        onClick={onAddStudent}>
                        <UserPlus className="w-4 h-4" /> הוסף תלמיד
                    </button>
                    <button
                        className="flex items-center gap-1 text-sm text-amber-600 hover:bg-amber-50 px-3 py-1.5 rounded-lg"
                        onClick={onEditStart}>
                        ✏️ עריכת שם כיתה
                    </button>
                    <button
                        className="text-red-400 hover:bg-red-50 p-1.5 rounded-lg"
                        onClick={onDelete}>
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded
                        ? <ChevronUp className="w-4 h-4 text-gray-400" />
                        : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
            </div>

            {/* Students */}
            {isExpanded && (
                <div className="border-t">
                    <StudentsTable
                        students={cls.students}
                        classId={cls.id}
                        onEdit={onEditStudent}
                        onDelete={onDeleteStudent}
                    />
                </div>
            )}
        </div>
    )
}