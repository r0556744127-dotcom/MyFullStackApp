type Props = {
  submissions: any[];
  editingSubmissionId: number | null;
  gradeInput: string;
  commentInput: string;
  onClose: () => void;
  onEditStart: (sub: any) => void;
  onGradeChange: (val: string) => void;
  onCommentChange: (val: string) => void;
  onSaveGrade: (id: number) => void;
  onCancelEdit: () => void;
};

export default function SubmissionsModal({
  submissions, editingSubmissionId, gradeInput, commentInput,
  onClose, onEditStart, onGradeChange, onCommentChange, onSaveGrade, onCancelEdit
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white p-8 rounded-[2rem] w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-full">✕</button>
        <h2 className="text-2xl font-black mb-6 text-indigo-700 border-b pb-4">רשימת הגשות תלמידים</h2>

        {submissions.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">טרם התקבלו הגשות למטלה זו</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s: any) => (
              <div key={s.submissionId} className="p-5 border border-slate-100 bg-slate-50 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-indigo-900 text-lg">מזהה הגשה: {s.submissionId}</p>
                    <p className="text-xs text-slate-400">הוגש ב: {new Date(s.submittedAt).toLocaleString('he-IL')}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl border font-bold text-emerald-600 shadow-sm">
                    ציון: {s.grade === 0 ? "טרם נבדק" : s.grade}
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl border font-bold text-emerald-600 shadow-sm">
                    שם התלמיד: {s.studentName ?? "לא ידוע"}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-100 text-sm">
                  <span className="text-slate-400 block mb-1">הערת המורה:</span>
                  {s.teacherComment || "אין הערות"}
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-100 text-sm flex gap-2 items-center">
                  <a href={`https://localhost:7030/Submissions/${s.filePath}`}
                    target="_blank" rel="noopener noreferrer">👁 פתח קובץ</a>

                  {editingSubmissionId === s.submissionId ? (
                    <div className="mt-3 space-y-2 w-full">
                      <input type="number" placeholder="ציון" value={gradeInput}
                        onChange={e => onGradeChange(e.target.value)}
                        className="border p-2 w-full rounded-lg" />
                      <textarea placeholder="הערת מורה" value={commentInput}
                        onChange={e => onCommentChange(e.target.value)}
                        className="border p-2 w-full rounded-lg" />
                      <div className="flex gap-2">
                        <button onClick={() => onSaveGrade(s.submissionId)}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg">שמור</button>
                        <button onClick={onCancelEdit}
                          className="bg-gray-200 px-3 py-1 rounded-lg">ביטול</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => onEditStart(s)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg mt-2">ערוך ציון</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}