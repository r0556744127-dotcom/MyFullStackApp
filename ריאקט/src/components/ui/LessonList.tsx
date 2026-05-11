import { Trash2, Plus, Calendar } from "lucide-react";

type Props = {
  lessons: any[];
  showAssignmentForm: number | null;
  newAssignment: any;
  onDeleteLesson: (id: number) => void;
  onShowAssignmentForm: (id: number | null) => void;
  onAssignmentChange: (data: any) => void;
  onAddAssignment: (lessonId: number) => void;
  onDeleteAssignment: (id: number) => void;
  onViewSubmissions: (assignmentId: number) => void;
  getEmbedUrl: (link: string) => string | null;
};

export default function LessonList({
  lessons, showAssignmentForm, newAssignment,
  onDeleteLesson, onShowAssignmentForm, onAssignmentChange,
  onAddAssignment, onDeleteAssignment, onViewSubmissions, getEmbedUrl
}: Props) {
  return (
    <div className="space-y-8">
      {lessons.map((l: any) => {
        const lId = l.idLesson || l.IdLesson;
        const ytEmbed = getEmbedUrl(l.recordingLink || l.RecordingLink);

        return (
          <div key={lId} className="bg-white p-8 rounded-2xl shadow relative">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Calendar size={14} />
                {new Date(l.date || l.Date).toLocaleDateString('he-IL')}
              </span>
              <button onClick={() => onDeleteLesson(lId)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>

            <h3 className="text-2xl font-bold mb-2">{l.titelLesson || l.TitelLesson}</h3>
            <p className="text-gray-500 mb-4">{l.summary || l.Summary}</p>

            {ytEmbed ? (
              <iframe className="w-full h-64 rounded-xl" src={ytEmbed} />
            ) : l.recordingLink ? (
              <a href={l.recordingLink} target="_blank" className="text-blue-600">צפייה בהקלטה</a>
            ) : null}

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-slate-500">מטלות:</h4>
                <button onClick={() => onShowAssignmentForm(lId)}
                  className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-sm hover:bg-indigo-600 hover:text-white">
                  <Plus size={14} /> הוספת מטלה
                </button>
              </div>

              {l.assignments?.length > 0 ? (
                <div className="space-y-2">
                  {l.assignments.map((asn: any) => (
                    <div key={asn.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <p className="font-bold text-slate-700">{asn.title}</p>
                        <p className="text-xs text-slate-400">הגשה: {new Date(asn.dueDate).toLocaleDateString('he-IL')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => onViewSubmissions(asn.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl text-sm">
                          צפה בהגשות
                        </button>
                        <button onClick={() => onDeleteAssignment(asn.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-2">אין מטלות לשיעור זה</p>
              )}

              {showAssignmentForm === lId && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border">
                  <input placeholder="כותרת מטלה" value={newAssignment.AssignmentName}
                    onChange={e => onAssignmentChange({ ...newAssignment, AssignmentName: e.target.value })}
                    className="border p-2 w-full mb-2 rounded-lg" />
                  <input placeholder="כותרת" value={newAssignment.Title}
                    onChange={e => onAssignmentChange({ ...newAssignment, Title: e.target.value })}
                    className="border p-2 w-full mb-2 rounded-lg" />
                  <input type="date" value={newAssignment.date}
                    onChange={e => onAssignmentChange({ ...newAssignment, date: e.target.value })}
                    className="border p-2 w-full mb-2 rounded-lg" />
                  <input type="file"
                    onChange={e => onAssignmentChange({ ...newAssignment, File: e.target.files?.[0] || null })}
                    className="border p-2 w-full mb-2 rounded-lg" />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => onAddAssignment(lId)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl flex-1">שמור מטלה</button>
                    <button onClick={() => onShowAssignmentForm(null)}
                      className="bg-gray-200 px-4 py-2 rounded-xl">ביטול</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}