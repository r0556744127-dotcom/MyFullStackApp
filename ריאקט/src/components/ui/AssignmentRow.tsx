import { Trash2, Eye } from "lucide-react";
import SubmissionsTable from "./SubmissionsTable";

type AssignmentRowProps = {
  asn: any;
  viewingAssignmentId: number | null;
  editingAssignment: number | null;
  editAssignmentData: { title: string; dueDate: string; newFile: File | null };
  submissions: any[];
  editingSubmissionId: number | null;
  gradeInput: string;
  commentInput: string;
  onView: (id: number) => void;
  onEditStart: (asn: any) => void;
  onEditChange: (data: any) => void;
  onEditSave: (id: number) => void;
  onEditCancel: () => void;
  onDelete: (id: number) => void;
  onGradeEditStart: (sub: any) => void;
  onGradeChange: (val: string) => void;
  onCommentChange: (val: string) => void;
  onSaveGrade: (submissionId: number) => void;
  onCancelGradeEdit: () => void;
  onCloseSubmissions: () => void;
  onViewSubmissionFile: (submissionId: number, fileName?: string) => void; // <--- הוספנו את זה
};

export default function AssignmentRow({
  asn, viewingAssignmentId, editingAssignment, editAssignmentData,
  submissions, editingSubmissionId, gradeInput, commentInput,
  onView, onEditStart, onEditChange, onEditSave, onEditCancel, onDelete,
  onGradeEditStart, onGradeChange, onCommentChange, onSaveGrade,
  onCancelGradeEdit, onCloseSubmissions,onViewSubmissionFile
}: AssignmentRowProps) {
  return (
    <div className="flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-white">
        <div>
          <p className="font-bold text-slate-700">{asn.assignmentName}</p>
          <p className="text-[10px] text-slate-400">
            תאריך הגשה: {new Date(asn.dueDate).toLocaleDateString('he-IL')}
          </p>
          
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(asn.id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">
            <Eye size={14} /> {viewingAssignmentId === asn.id ? "רענן הגשות" : "צפה בהגשות"}
          </button>
          <button onClick={() => onEditStart(asn)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600">
            ✏️ עריכה
          </button>
          {/* <button 
  onClick={() => onViewSubmissionFile(sub.submissionId, sub.fileName)}
  className="text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md"
>
  📄 צפה בקובץ
</button> */}
          <button onClick={() => onDelete(asn.id)}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {editingAssignment === asn.id && (
        <div className="p-4 bg-amber-50 border-t border-amber-200">
          <h5 className="text-xs font-black text-amber-700 mb-3">עריכת מטלה:</h5>
          <input placeholder="כותרת מטלה" value={editAssignmentData.title}
            onChange={e => onEditChange({ ...editAssignmentData, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded-lg text-sm" />
          <input type="date" value={editAssignmentData.dueDate}
            onChange={e => onEditChange({ ...editAssignmentData, dueDate: e.target.value })}
            className="border p-2 w-full mb-2 rounded-lg text-sm" />
          <input type="file"
            onChange={e => onEditChange({ ...editAssignmentData, newFile: e.target.files?.[0] || null })}
            className="border p-2 w-full mb-2 rounded-lg text-sm" />
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEditSave(asn.id)}
              className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-600">שמור שינויים</button>
            <button onClick={onEditCancel}
              className="bg-gray-300 px-4 py-2 rounded-xl text-sm">ביטול</button>
          </div>
        </div>
      )}

      {viewingAssignmentId === asn.id && (
        <SubmissionsTable
          submissions={submissions}
          editingSubmissionId={editingSubmissionId}
          gradeInput={gradeInput}
          commentInput={commentInput}
          onEditStart={onGradeEditStart}
          onGradeChange={onGradeChange}
          onCommentChange={onCommentChange}
          onSaveGrade={onSaveGrade}
          onCancelEdit={onCancelGradeEdit}
          onClose={onCloseSubmissions}
          onViewSubmissionFile={onViewSubmissionFile} // <--- העברנו את הפונקציה לקומפוננטת הטבלה
        />
      )}
    </div>
  );
}