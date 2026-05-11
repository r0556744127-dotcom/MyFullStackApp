import { useState } from "react";
import { X, Trash2, Users } from "lucide-react";

type Staff = {
  id: number;
  fullName: string;
  identityNumber: string;
  email: string;
  role: number;
};

type Props = {
  staff: Staff[];
  onClose: () => void;
  onDelete: (id: number) => void;
  onUpdate: (updated: Staff) => void;
  onSaveEdit?: (id: number, data: Partial<Staff>) => Promise<void>;
};

export default function StaffListModal({
  staff,
  onClose,
  onDelete,
  onUpdate
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: 0
  });

  const startEdit = (s: Staff) => {
    setEditingId(s.id);
    setForm({
      fullName: s.fullName,
      email: s.email,
      role: s.role
    });
  };

  const saveEdit = async (id: number) => {
    try {
      await fetch(`/api/Staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          role: form.role
        })
      });

      onUpdate({
        id,
        fullName: form.fullName,
        email: form.email,
        identityNumber: "",
        role: form.role
      });

      setEditingId(null);
    } catch {
      alert("שגיאה בעדכון מורה");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-3xl p-6 shadow-2xl max-h-[80vh] flex flex-col">

        {/* כותרת */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-700">
            <Users />
            ניהול מורות
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* טבלה */}
        <div className="overflow-y-auto border rounded-xl">
          <table className="w-full text-right text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">שם</th>
                <th className="p-3">אימייל</th>
                <th className="p-3">תפקיד</th>
                <th className="p-3 text-center">פעולות</th>
              </tr>
            </thead>

            <tbody>
              {staff.map(s => (
                <tr key={s.id} className="border-t">

                  {/* שם */}
                  <td className="p-3">
                    {editingId === s.id ? (
                      <input
                        value={form.fullName}
                        onChange={e =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      s.fullName
                    )}
                  </td>

                  {/* אימייל */}
                  <td className="p-3">
                    {editingId === s.id ? (
                      <input
                        value={form.email}
                        onChange={e =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      s.email
                    )}
                  </td>

                  {/* תפקיד */}
                  <td className="p-3">
                    {editingId === s.id ? (
                      <select
                        value={form.role}
                        onChange={e =>
                          setForm({ ...form, role: Number(e.target.value) })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value={0}>מורה</option>
                        <option value={1}>מנהל</option>
                      </select>
                    ) : (
                      s.role === 1 ? "מנהל" : "מורה"
                    )}
                  </td>

                  {/* פעולות */}
                  <td className="p-3 text-center">
                    {editingId === s.id ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => saveEdit(s.id)}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          שמור
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 px-2 py-1 rounded"
                        >
                          ביטול
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => startEdit(s)}
                          className="text-indigo-600"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => onDelete(s.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}