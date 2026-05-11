import { useState } from "react";
import { Loader2, X } from "lucide-react";

const COLORS = ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

export type ClassType = {
  name: string;
  color: string;
  grade: string;
};

type Props = {
  initialGrade: string;
  onSave: (data: ClassType) => Promise<void>;
  onClose: () => void;
};

export default function ClassForm({ initialGrade, onSave, onClose }: Props) {
  const [form, setForm] = useState<ClassType>({
    name: "",
    color: "#4F46E5",
    grade: initialGrade,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("נא להזין שם כיתה");
      return;
    }

    try {
      setLoading(true);
      await onSave(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

        {/* כותרת */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            יצירת כיתה — שכבת {initialGrade}
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* שם כיתה */}
        <input
          className="w-full border rounded-xl px-4 py-2 text-right mb-4"
          placeholder="שם כיתה (למשל: א' 1)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* בחירת צבע */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setForm({ ...form, color: c })}
              className={`w-9 h-9 rounded-full border-4 ${
                form.color === c ? "border-gray-800 scale-110" : "border-transparent"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>

        {/* כפתורים */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-bold flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "צור כיתה"}
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