import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function ScoreChart({ score = 0 }) {
  const value = Math.max(0, Math.min(100, score));
  const data = [
    { name: "score", value },
    { name: "remaining", value: 100 - value }
  ];

  return (
    <div className="relative h-44">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={58} outerRadius={78} startAngle={90} endAngle={-270}>
            <Cell fill="#06b6d4" />
            <Cell fill="rgba(148, 163, 184, 0.18)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-text">{value}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">ATS Score</span>
      </div>
    </div>
  );
}
