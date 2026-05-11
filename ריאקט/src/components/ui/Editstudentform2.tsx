import { useState } from "react"
import { Loader2 } from "lucide-react"
import type{ Student } from "./types"

type Props = {
    student: Student
    onSave: (s: { fullName: string; email: string }) => Promise<void>
    onClose: () => void
}

export default function Editstudentform2({ student, onSave, onClose }: Props) {
    const [form, setForm] = useState({
        fullName: student.fullName,
        email: student.email
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!form.fullName.trim()) return alert("נא להזין שם מלא")
        setLoading(true)
        await onSave(form)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" dir="rtl">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-gray-800">עריכת תלמיד</h2>
                    <p className="text-sm text-gray-400">{student.fullName}</p>
                </div>

                <div className="mb-4">
                    <label className="text-xs text-gray-500">תעודת זהות</label>
                    <div className="border rounded-xl px-4 py-2 bg-gray-100 text-gray-500">
                        {student.identityNumber}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-xs text-gray-500">שם מלא</label>
                    <input
                        className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                        value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                    />
                </div>

                <div className="mb-6">
                    <label className="text-xs text-gray-500">אימייל</label>
                    <input
                        className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4 mx-auto" /> : "שמור שינויים"}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 border py-2 rounded-xl text-gray-600 hover:bg-gray-50"
                    >
                        ביטול
                    </button>
                </div>
            </div>
        </div>
    )
}