import React from 'react';

export type OperationIndicator = {
  label: string;
  value: number;
};

type OperationHealthProps = {
  indicators: OperationIndicator[];
};

export const OperationHealth: React.FC<OperationHealthProps> = ({ indicators }) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
      <h2 className="text-lg font-semibold text-white">Saúde da operação</h2>
      <dl className="mt-4 space-y-3 text-sm text-slate-300">
        {indicators.map((indicator) => (
          <div key={indicator.label} className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3">
            <dt>{indicator.label}</dt>
            <dd className="font-semibold text-white">{indicator.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default OperationHealth;
