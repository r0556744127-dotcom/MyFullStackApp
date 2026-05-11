type AddLessonFormProps = {
  newLesson: { titelLesson: string; summary: string; recordingLink: string; date: string };
  videoFile: File | null;
  onChange: (updated: any) => void;
  onVideoChange: (file: File | null) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function AddLessonForm({
  newLesson, videoFile, onChange, onVideoChange, onSave, onCancel
}: AddLessonFormProps) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-2xl mb-12 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          placeholder="נושא השיעור"
          className="w-full border-2 p-4 rounded-2xl bg-slate-50 outline-none focus:border-indigo-400"
          value={newLesson.titelLesson}
          onChange={e => onChange({ ...newLesson, titelLesson: e.target.value })}
        />
        <input
          type="date"
          className="w-full border-2 p-4 rounded-2xl bg-slate-50 outline-none focus:border-indigo-400"
          value={newLesson.date}
          onChange={e => onChange({ ...newLesson, date: e.target.value })}
        />
        <textarea
          placeholder="סיכום השיעור"
          className="md:col-span-2 w-full border-2 p-4 rounded-2xl bg-slate-50 h-32 outline-none focus:border-indigo-400"
          value={newLesson.summary}
          onChange={e => onChange({ ...newLesson, summary: e.target.value })}
        />
        <div className="md:col-span-2 space-y-4">
          <label className="flex items-center gap-3 p-4 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
            <span className="text-2xl">🎬</span>
            <span className="text-sm text-slate-600">
              {videoFile ? `📎 ${videoFile.name}` : "העלי סרטון מהמחשב"}
            </span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={e => {
                onVideoChange(e.target.files?.[0] || null);
                onChange({ ...newLesson, recordingLink: "" });
              }}
            />
          </label>
          {videoFile && <p className="text-green-600 text-sm font-bold">🎬 קובץ מוכן להעלאה: {videoFile.name}</p>}
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={onSave} className="flex-1 bg-emerald-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl">
          שמור שיעור
        </button>
        <button onClick={onCancel} className="bg-slate-200 text-slate-600 px-8 rounded-2xl font-bold hover:bg-slate-300">
          ביטול
        </button>
      </div>
    </div>
  );
}