import { Zap, School } from "lucide-react";

type HeroBannerProps = {
  displayName: string;
};

export default function HeroBanner({ displayName }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-10 text-white shadow-2xl">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          <span className="text-sm font-semibold text-indigo-100 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            מרכז למידה דיגיטלי
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          שלום, {displayName}
        </h1>
        <p className="text-indigo-100 text-xl font-light max-w-2xl">
          ברוכים הבאים למערכת הניהול הלימודית. כאן תוכלו לנהל את הכיתות, השיעורים והתכנים בצורה חכמה.
        </p>
      </div>
      <div className="absolute -left-10 -bottom-10 opacity-10">
        <School size={300} />
      </div>
    </div>
  );
}