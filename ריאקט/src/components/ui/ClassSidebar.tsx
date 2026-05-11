type ClassSidebarProps = {
  className: string;
  categories: any[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
};

export default function ClassSidebar({
  className, categories, selectedCategoryId, onSelectCategory
}: ClassSidebarProps) {
  return (
    <aside className="w-80 bg-white border-l p-6 shadow-sm flex flex-col">
      <h2 className="text-2xl font-black mb-2 text-indigo-700">{className}</h2>
      <p className="text-[10px] text-slate-400 mb-8 font-medium uppercase tracking-wider">ניהול קטגוריות</p>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {categories?.map((c: any) => {
          const catId = c.id || c.Id;
          const isActive = Number(selectedCategoryId) === Number(catId);
          return (
            <div
              key={catId}
              onClick={() => onSelectCategory(catId)}
              className={`p-4 rounded-2xl cursor-pointer flex justify-between items-center ${
                isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'
              }`}
            >
              <span className="font-bold truncate">{c.lessonName}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}