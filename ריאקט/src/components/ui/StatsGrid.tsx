
type StatsGridProps = {
  cards: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    desc: string;
  }[];
};
export default function StatsGrid({ cards }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-4xl font-black text-slate-800 tracking-tight">{card.value}</div>
            <div className="text-md font-bold text-slate-700 mt-1">{card.label}</div>
            <div className="text-sm text-slate-400 mt-1">{card.desc}</div>
          </div>
        );
      })}
    </div>
  );
}