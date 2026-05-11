import { useState } from "react";
import { X, Loader2 } from "lucide-react";

type Student = {
  id: number;
  fullName: string;
  identityNumber: string;
  email: string;
};

type Props = {
  student: Student;
  onSave: (data: { fullName: string; email: string }) => Promise<void>;
  onClose: () => void;
};

export default function EditStudentForm({ student, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: student.fullName,
    email: student.email
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.fullName.trim()) {
      alert("נא להזין שם מלא");
      return;
    }

    setLoading(true);

    try {
      await onSave({
        fullName: form.fullName,
        email: form.email
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">

        {/* כותרת */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              עריכת תלמיד
            </h2>
            <p className="text-sm text-gray-400">
              {student.fullName}
            </p>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* תעודת זהות (לא ניתן לעריכה) */}
        <div className="mb-4">
          <label className="text-xs text-gray-500">תעודת זהות</label>
          <div className="border rounded-xl px-4 py-2 bg-gray-100 text-gray-500">
            {student.identityNumber}
          </div>
        </div>

        {/* שם */}
        <div className="mb-4">
          <label className="text-xs text-gray-500">שם מלא</label>
          <input
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
            value={form.fullName}
            onChange={e =>
              setForm({ ...form, fullName: e.target.value })
            }
          />
        </div>

        {/* אימייל */}
        <div className="mb-6">
          <label className="text-xs text-gray-500">אימייל</label>
          <input
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* כפתורים */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "שמור שינויים"
            )}
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-xl text-gray-600"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}