import { Trash2 } from "lucide-react";

type Category = { id?: number; Id?: number; lessonName: string };

type Props = {
  className: string;
  categories: Category[];
  selectedCategoryId: number | null;
  categoryName: string;
  editingCategoryId: number | null;
  editCategoryName: string;
  onSelectCategory: (id: number) => void;
  onCategoryNameChange: (val: string) => void;
  onAddCategory: () => void;
  onEditStart: (id: number, name: string) => void;
  onEditSave: (id: number) => void;
  onEditCancel: () => void;
  onEditNameChange: (val: string) => void;
  onDelete: (id: number) => void;
};

export default function CategorySidebar({
  className, categories, selectedCategoryId, categoryName,
  editingCategoryId, editCategoryName,
  onSelectCategory, onCategoryNameChange, onAddCategory,
  onEditStart, onEditSave, onEditCancel, onEditNameChange, onDelete
}: Props) {
  return (
    <aside className="w-80 bg-white border-l p-6 shadow-sm flex flex-col">
      <h2 className="text-2xl font-black mb-2 text-indigo-700">{className}</h2>
      <p className="text-[10px] text-slate-400 mb-8 font-medium uppercase tracking-wider">ניהול קטגוריות</p>

      <div className="mb-8 p-4 bg-indigo-50/50 rounded-2xl">
        <input
          value={categoryName}
          onChange={e => onCategoryNameChange(e.target.value)}
          className="border rounded-xl p-2.5 w-full mb-2"
          placeholder="קטגוריה חדשה..."
        />
        <button onClick={onAddCategory} className="w-full bg-indigo-600 text-white py-2 rounded-xl">
          הוסף קטגוריה
        </button>
      </div>

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
              {editingCategoryId === catId ? (
                <div className="flex items-center gap-1 w-full" onClick={e => e.stopPropagation()}>
                  <input
                    value={editCategoryName}
                    onChange={e => onEditNameChange(e.target.value)}
                    className="border rounded-lg px-2 py-1 text-sm w-full text-slate-900"
                    autoFocus
                  />
                  <button onClick={() => onEditSave(catId)}
                    className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-lg whitespace-nowrap">שמור</button>
                  <button onClick={onEditCancel}
                    className="text-xs bg-gray-300 px-2 py-1 rounded-lg">✕</button>
                </div>
              ) : (
                <div className="flex gap-1">
                  <button onClick={e => { e.stopPropagation(); onEditStart(catId, c.lessonName); }}
                    className="text-amber-400 hover:text-amber-600">✏️</button>
                  <button onClick={e => { e.stopPropagation(); onDelete(catId); }}
                    className="text-red-400"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}