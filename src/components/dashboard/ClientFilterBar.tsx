import React from 'react';
import type { ClientFilter } from './types';

type ClientFilterBarProps = {
  filter: ClientFilter;
  onFilterChange: (value: ClientFilter) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  availableFilters: ClientFilter[];
};

export const ClientFilterBar: React.FC<ClientFilterBarProps> = ({
  filter,
  onFilterChange,
  searchTerm,
  onSearchTermChange,
  availableFilters,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-slate-900/40 lg:flex-row lg:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-900/60 px-3 py-2">
        <span className="text-lg text-slate-500">🔍</span>
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          placeholder="Buscar por nome, empresa ou e-mail"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {availableFilters.map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              filter === status
                ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-900/40 text-slate-300 hover:bg-slate-900/70'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientFilterBar;
