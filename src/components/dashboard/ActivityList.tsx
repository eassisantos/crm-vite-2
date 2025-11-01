import React from 'react';
import type { Activity } from './types';

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
      <h2 className="text-lg font-semibold text-white">Atividades recentes</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-300">
        {activities.map((activity) => (
          <li key={activity.id} className="rounded-xl bg-slate-900/60 p-4">
            <p className="font-medium text-white">{activity.description}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
              {activity.date} · {activity.owner}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
