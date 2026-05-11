import ClassCard from "./ClassCard";

type Props = {
  classes: any[];
};

export default function ClassList({ classes }: Props) {
  if (!classes.length) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
        <p className="font-bold">לא נמצאו כיתות המשויכות אלייך במערכת.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-3">
      {classes.map((cls) => (
        <ClassCard key={cls.id} cls={cls} />
      ))}
    </div>
  );
}