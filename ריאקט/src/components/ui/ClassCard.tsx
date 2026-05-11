import { BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

type Props = {
  cls: any;
};

export default function ClassCard({ cls }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border border-slate-100 rounded-2xl p-4 hover:bg-indigo-50/30 transition-all shadow-sm group">

      {/* שם כיתה */}
      <div className="flex items-center gap-4 w-48">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg group-hover:scale-110 transition-transform">
          {cls.name?.toString().charAt(0)}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            שם הקבוצה
          </span>
          <span className="font-black text-slate-800 text-lg">
            כיתה {cls.name}
          </span>
        </div>
      </div>

      {/* כפתור כניסה */}
      <a
        href={createPageUrl("classDetailTeacher") + `/${cls.id}`}
        className="flex items-center gap-1.5 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium"
      >
        <BookOpen className="w-4 h-4" />
        פתח כיתה
      </a>
    </div>
  );
}