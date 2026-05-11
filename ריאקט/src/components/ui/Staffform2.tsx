import { useState } from "react"
import { UserPlus, X, Loader2 } from "lucide-react"
import type{ Staff } from "./types"

type Props = {
    onSave: (s: Omit<Staff, "id">) => Promise<void>
    onClose: () => void
}

export default function Staffform2({ onSave, onClose }: Props) {
    const [form, setForm] = useState({ fullName: "", identityNumber: "", email: "", role: 2 })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!form.fullName.trim()) return alert("נא להזין שם מלא")
        setLoading(true)
        await onSave(form)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-700">
                        <UserPlus /> הוספת מורה חדש למערכת
                    </h2>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                    <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="שם המורה המלא *"
                        value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
                    <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="תעודת זהות (תשמש כסיסמה)"
                        value={form.identityNumber} onChange={e => setForm({ ...form, identityNumber: e.target.value })} />
                    <input className="w-full border rounded-xl px-4 py-2 text-right" placeholder="אימייל"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="flex gap-2 mt-8">
                    <button
                        className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-bold flex items-center justify-center gap-2"
                        onClick={handleSubmit} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "שמור מורה"}
                    </button>
                    <button className="flex-1 border rounded-xl py-2 text-gray-600" onClick={onClose}>
                        ביטול
                    </button>
                </div>
            </div>
        </div>
    )
}