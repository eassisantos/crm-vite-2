import React from 'react';

export type Trend = 'up' | 'down';

export type Stat = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
};

const trendColors: Record<Trend, string> = {
  up: 'text-emerald-600 bg-emerald-100',
  down: 'text-rose-600 bg-rose-100',
};

export const StatCard: React.FC<Stat> = ({ title, value, change, trend }) => {
  return (
    <article className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <span
        className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${trendColors[trend]}`}
      >
        {trend === 'up' ? '▲' : '▼'} {change}
      </span>
    </article>
  );
};

export default StatCard;
