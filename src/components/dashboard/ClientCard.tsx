import React from 'react';
import type { Client } from './types';

type ClientCardProps = {
  client: Client;
};

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-900/60 p-5 transition hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 className="text-lg font-medium text-white">{client.name}</h3>
        <p className="text-sm text-slate-400">{client.company}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
          <span>📧 {client.email}</span>
          <span>📞 {client.phone}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-sm sm:items-end">
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">{client.status}</span>
        <p className="text-slate-400">{client.lastActivity}</p>
        <button className="text-sm font-medium text-emerald-300 hover:text-emerald-200">Ver detalhes</button>
      </div>
    </article>
  );
};

export default ClientCard;
