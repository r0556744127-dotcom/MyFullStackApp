type AssignmentSubmissionProps = {
  asgn: any;
  isSubmitting: boolean;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

export default function AssignmentSubmission({
  asgn,
  isSubmitting,
  selectedFile,
  onFileChange,
  onSubmit,
}: AssignmentSubmissionProps) {
  const asgnId = asgn.id || asgn.Id;

  if (asgn.myGrade !== undefined && asgn.myGrade !== null) {
    return (
      <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
        <p className="text-emerald-600 font-bold text-sm">✅ הוגש בהצלחה</p>
        <p className="text-indigo-700 font-black text-lg">ציון: {asgn.myGrade}</p>
        {asgn.teacherComment && (
          <p className="text-slate-500 text-xs mt-1 italic">"{asgn.teacherComment}"</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
      <p className="text-[11px] font-bold text-indigo-400 mb-2 uppercase">הגשת פתרון:</p>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
          <span className="text-xs text-slate-600">
            {selectedFile ? `📎 ${selectedFile.name}` : "בחר קובץ..."}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={e => onFileChange(e.target.files?.[0] || null)}
          />
        </label>
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !selectedFile}
          className={`px-6 py-1.5 rounded-lg text-xs font-black transition-all ${
            isSubmitting || !selectedFile
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
          }`}
        >
          {isSubmitting ? "שולח..." : "הגש עכשיו"}
        </button>
      </div>
    </div>
  );
}