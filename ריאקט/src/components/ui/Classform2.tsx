import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import type{ ClassType } from "./types"

const COLORS = ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"]

type Props = {
    initialGrade: string
    onSave: (c: Omit<ClassType, "id" | "students">) => Promise<void>
    onClose: () => void
}

export default function Classform2({ initialGrade, onSave, onClose }: Props) {
    const [form, setForm] = useState({ name: "", color: "#4F46E5", grade: initialGrade })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!form.name.trim()) return alert("נא להזין שם כיתה")
        setLoading(true)
        await onSave(form)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">יצירת כיתה — שכבת {initialGrade}'</h2>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                    <input
                        className="w-full border rounded-xl px-4 py-2 text-right"
                        placeholder="שם כיתה (למשל: א' 2)"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <div className="flex gap-2 flex-wrap justify-center py-2">
                        {COLORS.map(c => (
                            <button key={c} onClick={() => setForm({ ...form, color: c })}
                                className={`w-9 h-9 rounded-full border-4 transition-all ${form.color === c ? "border-gray-800 scale-110" : "border-transparent hover:scale-105"}`}
                                style={{ background: c }} />
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 mt-6">
                    <button
                        className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-bold flex items-center justify-center gap-2"
                        onClick={handleSubmit} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "צור כיתה"}
                    </button>
                    <button className="flex-1 border rounded-xl py-2 text-gray-600" onClick={onClose}>
                        ביטול
                    </button>
                </div>
            </div>
        </div>
    )
}