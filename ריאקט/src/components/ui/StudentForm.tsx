import { useState } from "react";
import { X, Loader2, UserPlus } from "lucide-react";

type StudentFormProps = {
  classId: number | null;
  onSave: (data: {
    fullName: string;
    identityNumber: string;
    email: string;
  }) => Promise<void>;
  onClose: () => void;
};

export default function StudentForm({
  classId,
  onSave,
  onClose
}: StudentFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    identityNumber: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.fullName.trim()) {
      alert("נא להזין שם מלא");
      return;
    }

    if (!/^\d{9}$/.test(form.identityNumber)) {
      alert("מספר זהות חייב להכיל 9 ספרות");
      return;
    }

    if (!form.email.trim()) {
      alert("יש להזין אימייל");
      return;
    }

    setLoading(true);

    try {
      await onSave({
        fullName: form.fullName,
        identityNumber: form.identityNumber,
        email: form.email
      });

      setForm({ fullName: "", identityNumber: "", email: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

        {/* כותרת */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="text-indigo-600" />
            הוספת תלמיד חדש
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* טופס */}
        <div className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-2 text-right"
            placeholder="שם מלא *"
            value={form.fullName}
            onChange={e =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          <input
            className="w-full border rounded-xl px-4 py-2 text-right"
            placeholder="מספר זהות"
            value={form.identityNumber}
            onChange={e =>
              setForm({ ...form, identityNumber: e.target.value })
            }
          />

          <input
            className="w-full border rounded-xl px-4 py-2 text-right"
            placeholder="אימייל"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* כפתורים */}
        <div className="flex gap-2 mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "הוסף תלמיד"
            )}
          </button>

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-2 text-gray-600"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}