type StudentSidebarProps = {
  studentName: string;
  className: string;
  categories: any[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
  onLogout: () => void;
};

export default function StudentSidebar({
  studentName,
  className,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onLogout,
}: StudentSidebarProps) {
  return (
    <aside className="w-80 bg-white border-l p-6 shadow-sm flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-black text-indigo-700">שלום, {studentName} 👋</h2>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">הכיתה שלי: {className}</p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
        <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">נושאי לימוד</p>
        {categories?.map((c: any) => {
          const catId = c.id || c.Id;
          return (
            <div
              key={catId}
              onClick={() => onSelectCategory(catId)}
              className={`p-4 rounded-2xl cursor-pointer transition-all font-bold ${
                selectedCategoryId === catId
                  ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg translate-x-1'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              {c.lessonName}
            </div>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="mt-4 text-xs text-red-400 hover:text-red-600 font-medium text-right"
      >
        התנתקות מהמערכת
      </button>
    </aside>
  );
}