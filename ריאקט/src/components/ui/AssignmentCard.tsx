import AssignmentSubmission from "./AssignmentSubmission";

type AssignmentCardProps = {
  asgn: any;
  isSubmitted: boolean;
  isSubmitting: boolean;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

export default function AssignmentCard({
  asgn,
  isSubmitted,
  isSubmitting,
  selectedFile,
  onFileChange,
  onSubmit,
}: AssignmentCardProps) {
  const path = asgn.filePath || asgn.FilePath || asgn.filepath;

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">{asgn.title || asgn.Title}</span>
        <span className="text-[10px] text-slate-400">
          הגשה עד: {new Date(asgn.dueDate || asgn.DueDate).toLocaleDateString('he-IL')}
        </span>
      </div>

      {path ? (
  <a
    href={`https://localhost:7030/Uploads/${asgn.filePath}`}
    target="_blank"
    rel="noreferrer"
    download
    className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-md"
  >
    📥 הורד קובץ
  </a>
) : (
  <span className="text-[10px] text-slate-300 italic">לא צורף קובץ</span>
)}

      {isSubmitted ? (
        <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
          <p className="text-emerald-600 font-bold text-sm">✅ הוגש בהצלחה</p>
          {asgn.myGrade !== undefined && asgn.myGrade !== null ? (
            <div className="mt-2">
              <p className="text-indigo-700 font-black text-lg">ציון: {asgn.myGrade}</p>
              {asgn.teacherComment && (
                <p className="text-slate-500 text-xs mt-1 italic">"{asgn.teacherComment}"</p>
              )}
            </div>
          ) : (
            <p className="text-[10px] text-emerald-400 mt-1 italic">טרם נבדק ע"י המורה</p>
          )}
        </div>
      ) : (
        <AssignmentSubmission
          asgn={asgn}
          isSubmitting={isSubmitting}
          selectedFile={selectedFile}
          onFileChange={onFileChange}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}