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
    isAdmin: boolean  // ← הוסף כאן

}

export default function ClassCard2({
    cls, isEditing, editClassName,
    onToggle,onEditSave,isAdmin,
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
                                    className="border rounded-lg px-2 py-1 text-sm w-32"
                                    autoFocus
                                />
                               
                                
                            </div>
                        ) : (
                            <span className="font-bold text-gray-800">{cls.name}</span>
                        )}
                        <p className="text-xs text-gray-400">
                            <Users className="w-3 h-3 inline ml-1" />
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <a href={createPageUrl(isAdmin ? "ClassDetail" : "classDetailTeacher") + `/${cls.id}`}
    className="flex items-center gap-1.5 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium">
    <BookOpen className="w-4 h-4" /> פתח כיתה
</a>

                  
                </div>
            </div>

            
            
        </div>
    )
}