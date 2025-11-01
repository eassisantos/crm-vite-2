import React, { useMemo, useState } from 'react';
import { ActivityList } from './components/dashboard/ActivityList';
import { ClientCard } from './components/dashboard/ClientCard';
import { ClientFilterBar } from './components/dashboard/ClientFilterBar';
import { OperationHealth } from './components/dashboard/OperationHealth';
import { StatCard } from './components/dashboard/StatCard';
import { TaskList } from './components/dashboard/TaskList';
import type { ClientFilter } from './components/dashboard/types';
import { activities, clients, stats, statusFilters, tasks } from './data/dashboard';

const App: React.FC = () => {
  const [clientFilter, setClientFilter] = useState<ClientFilter>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    const normalizedTerm = searchTerm.toLowerCase();

    return clients.filter((client) => {
      const matchesStatus = clientFilter === 'Todos' || client.status === clientFilter;
      const matchesTerm = [client.name, client.company, client.email]
        .join(' ')
        .toLowerCase()
        .includes(normalizedTerm);

      return matchesStatus && matchesTerm;
    });
  }, [clientFilter, searchTerm]);

  const indicators = useMemo(
    () => [
      {
        label: 'Clientes ativos',
        value: clients.filter((client) => client.status === 'Ativo').length,
      },
      {
        label: 'Prospects em negociação',
        value: clients.filter((client) => client.status === 'Prospect').length,
      },
      {
        label: 'Tarefas atrasadas',
        value: tasks.filter((task) => task.status === 'Atrasada').length,
      },
    ],
    [clients, tasks],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">CRM Jurídico</p>
            <h1 className="text-2xl font-semibold">Painel de operações</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium hover:border-emerald-400/60 hover:text-emerald-300">
              Exportar dados
            </button>
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
              Novo registro
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-6 py-10">
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-400">Visão geral</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Clientes</h2>
              <span className="text-sm text-slate-400">{filteredClients.length} de {clients.length} clientes</span>
            </div>

            <ClientFilterBar
              filter={clientFilter}
              onFilterChange={setClientFilter}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              availableFilters={statusFilters}
            />

            <div className="mt-5 space-y-3">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => <ClientCard key={client.id} client={client} />)
              ) : (
                <p className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
                  Nenhum cliente encontrado com os filtros selecionados.
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <OperationHealth indicators={indicators} />
            <TaskList tasks={tasks} />
            <ActivityList activities={activities} />
          </aside>
        </section>
      </main>
    </div>
  );
};

export default App;
