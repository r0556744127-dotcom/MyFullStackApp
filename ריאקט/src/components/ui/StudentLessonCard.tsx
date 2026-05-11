import AssignmentCard from "./AssignmentCard";

type StudentLessonCardProps = {
  lesson: any;
  assignments: any[];
  submittedAssignments: Set<number>;
  isSubmitting: boolean;
  selectedFiles: Record<number, File | null>;
  onToggleAssignments: (lessonId: number) => void;
  onFileChange: (asgnId: number, file: File | null) => void;
  onSubmit: (asgnId: number) => void;
};

export default function StudentLessonCard({
  lesson, assignments, submittedAssignments, isSubmitting,
  selectedFiles, onToggleAssignments, onFileChange, onSubmit
}: StudentLessonCardProps) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">שיעור</span>
        <span className="text-slate-400 text-xs">📅 {new Date(lesson.date).toLocaleDateString('he-IL')}</span>
      </div>

      <h3 className="text-2xl font-black mb-3 text-slate-800">{lesson.titelLesson}</h3>
      <p className="text-slate-500 leading-relaxed mb-8">{lesson.summary}</p>

      <button
        onClick={() => onToggleAssignments(lesson.idLesson)}
        className="mt-4 text-xs text-indigo-600 hover:text-indigo-800 font-bold text-right bg-indigo-50 px-3 py-1 rounded-lg"
      >
        {assignments ? "הסתר מטלות" : "➕ לצפייה במטלות השיעור"}
      </button>

      {assignments && (
        <div className="mt-4 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold text-slate-700 mb-2">מטלות לשיעור:</h4>
          {assignments.length > 0 ? (
            assignments.map((asgn: any) => {
              const asgnId = asgn.id || asgn.Id;
              return (
                <AssignmentCard
                  key={asgnId}
                  asgn={asgn}
                  isSubmitted={submittedAssignments.has(asgnId)}
                  isSubmitting={isSubmitting}
                  selectedFile={selectedFiles[asgnId] || null}
                  onFileChange={file => onFileChange(asgnId, file)}
                  onSubmit={() => onSubmit(asgnId)}
                />
              );
            })
          ) : (
            <p className="text-xs text-slate-400 italic">אין מטלות זמינות לשיעור זה.</p>
          )}
        </div>
      )}

      {lesson.recordingLink && (() => {
        const link = typeof lesson.recordingLink === "string"
          ? lesson.recordingLink
          : lesson.recordingLink?.absoluteUri || String(lesson.recordingLink);
        if (!link || link.startsWith("file:///")) return null;
        return (
          <div className="mt-6 text-center">
            <a href={link} target="_blank" rel="noreferrer"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg inline-block">
              📥 הורד את הסרטון לצפייה
            </a>
          </div>
        );
      })()}
    </div>
  );
}