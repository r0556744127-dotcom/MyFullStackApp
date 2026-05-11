import { useState } from "react"
import { Users, X, Trash2 } from "lucide-react"
import apiClient from "../../api/apiClient"
import type{ Staff } from "./types"

type Props = {
    staff: Staff[]
    onDelete: (id: number) => void
    onClose: () => void
    onUpdate: (s: Staff) => void
}

export default function Stafflistmodal2({ staff, onDelete, onClose, onUpdate }: Props) {
    const [editingStaffId, setEditingStaffId] = useState<number | null>(null)
    const [editStaff, setEditStaff] = useState({ fullName: "", email: "", role: 0 })

    const updateStaff = async (s: Staff) => {
        try {
            await apiClient.put(`/Staff/${s.id}`, {
                FullName: editStaff.fullName,
                Email: editStaff.email,
                Role: editStaff.role
            })
            onUpdate({
                ...s,
                fullName: editStaff.fullName,
                email: editStaff.email,
                role: editStaff.role
            })
            setEditingStaffId(null)
        } catch {
            alert("שגיאה בעדכון מורה")
        }
    }

    const startEdit = (s: Staff) => {
        setEditingStaffId(s.id)
        setEditStaff({ fullName: s.fullName, email: s.email, role: s.role ?? 0 })
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[60]" dir="rtl">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl max-h-[80vh] flex flex-col">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
                        <Users /> ניהול צוות המורות
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="text-gray-400" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 border rounded-xl">
                    <table className="w-full text-right border-collapse">
                        <thead className="bg-gray-50 sticky top-0 border-b">
                            <tr>
                                <th className="p-4">שם המורה</th>
                                <th className="p-4">פרטים</th>
                                <th className="p-4 text-center">פעולות</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {staff.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-400">
                                        לא נמצאו מורות במערכת
                                    </td>
                                </tr>
                            ) : (
                                staff.map(s => (
                                    <tr key={s.id} className="hover:bg-gray-50">

                                        {/* שם */}
                                        <td className="p-4 font-medium">
                                            {editingStaffId === s.id ? (
                                                <input
                                                    value={editStaff.fullName}
                                                    onChange={e => setEditStaff({ ...editStaff, fullName: e.target.value })}
                                                    className="border p-1 rounded w-full"
                                                />
                                            ) : s.fullName}
                                        </td>

                                        {/* פרטים */}
                                        <td className="p-4 text-sm text-gray-500">
                                            {editingStaffId === s.id ? (
                                                <>
                                                    <input
                                                        value={editStaff.email}
                                                        onChange={e => setEditStaff({ ...editStaff, email: e.target.value })}
                                                        className="border p-1 rounded w-full mb-2"
                                                    />
                                                    <select
                                                        value={editStaff.role}
                                                        onChange={e => setEditStaff({ ...editStaff, role: Number(e.target.value) })}
                                                        className="border p-1 rounded w-full"
                                                    >
                                                        <option value={1}>מנהל</option>
                                                        <option value={0}>מורה</option>
                                                    </select>
                                                </>
                                            ) : (
                                                <>
                                                    <div>{s.identityNumber}</div>
                                                    <div className="text-xs opacity-60">{s.email}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {s.role === 1 ? "מנהל" : "מורה"}
                                                    </div>
                                                </>
                                            )}
                                        </td>

                                        {/* פעולות */}
                                        <td className="p-4 text-center">
                                            {editingStaffId === s.id ? (
                                                <div className="flex gap-2 justify-center">
                                                    <button onClick={() => updateStaff(s)}
                                                        className="bg-green-600 text-white px-2 py-1 rounded">
                                                        שמור
                                                    </button>
                                                    <button onClick={() => setEditingStaffId(null)}
                                                        className="bg-gray-300 px-2 py-1 rounded">
                                                        ביטול
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-3 justify-center">
                                                    <button onClick={() => startEdit(s)} className="text-indigo-600">
                                                        ✏️
                                                    </button>
                                                    <button onClick={() => onDelete(s.id)} className="text-red-500">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}