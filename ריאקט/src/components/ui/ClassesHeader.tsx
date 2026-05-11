import { GraduationCap, UserPlus, Users } from "lucide-react";

export default function ClassesHeader({
  classesCount,
  studentsCount,
  onAddStaff,
  onOpenStaffList
}: {
  classesCount: number;
  studentsCount: number;
  onAddStaff: () => void;
  onOpenStaffList: () => void;
}) {
  return (
    <header className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
      <div>
        <h1 className="text-3xl font-black text-gray-900">
          ניהול מבנה בית הספר
        </h1>

        <div className="flex gap-4 mt-1 items-center">
          <p className="text-gray-400">
            {classesCount} כיתות · {studentsCount} תלמידים
          </p>

          <button
            onClick={onAddStaff}
            className="text-indigo-600 font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-1 rounded-lg text-sm"
          >
            <UserPlus className="w-4 h-4" /> הוספת מורה
          </button>

          <button
            onClick={onOpenStaffList}
            className="text-gray-600 font-bold flex items-center gap-1 hover:bg-gray-100 px-3 py-1 rounded-lg text-sm border"
          >
            <Users className="w-4 h-4" /> ניהול מורות
          </button>
        </div>
      </div>

      <GraduationCap className="w-10 h-10 text-indigo-600" />
    </header>
  );
}