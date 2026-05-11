import { Link } from "react-router-dom";
import { Users, GraduationCap } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function LoginLinksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between text-white shadow-xl">
        <div className="text-center sm:text-right mb-4 sm:mb-0">
          <h3 className="font-black text-2xl mb-1">מרחב תלמידים</h3>
          <p className="text-emerald-100 opacity-90">גישה לשיעורים, הקלטות וחומרי למידה</p>
        </div>
        <Link
          to={createPageUrl("StudentLogin")}
          className="bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-3 text-lg"
        >
          <GraduationCap className="w-6 h-6" /> כניסת תלמיד
        </Link>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between text-white shadow-xl">
        <div className="text-center sm:text-right mb-4 sm:mb-0">
          <h3 className="font-black text-2xl mb-1">מרחב צוות</h3>
          <p className="text-blue-100 opacity-90">ניהול מערכת השעות ותוכן הלימודים</p>
        </div>
        <Link
          to={createPageUrl("StaffLogin")}
          className="bg-white text-blue-800 font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-3 text-lg"
        >
          <Users className="w-6 h-6" /> כניסת צוות
        </Link>
      </div>
    </div>
  );
}