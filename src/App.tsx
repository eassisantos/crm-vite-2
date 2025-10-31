import React, { useMemo, useState } from 'react';
import type { Activity } from './components/dashboard/ActivityList';
import { ActivityList } from './components/dashboard/ActivityList';
import type { Client, ClientStatus } from './components/dashboard/ClientCard';
import { ClientCard } from './components/dashboard/ClientCard';
import { ClientFilterBar } from './components/dashboard/ClientFilterBar';
import { OperationHealth } from './components/dashboard/OperationHealth';
import type { Stat } from './components/dashboard/StatCard';
import { StatCard } from './components/dashboard/StatCard';
import type { Task } from './components/dashboard/TaskList';
import { TaskList } from './components/dashboard/TaskList';

type ClientFilter = ClientStatus | 'Todos';

const stats: Stat[] = [
  { title: 'Clientes ativos', value: '128', change: '+12%', trend: 'up' },
  { title: 'Novos leads', value: '37', change: '+8%', trend: 'up' },
  { title: 'Casos em andamento', value: '54', change: '-3%', trend: 'down' },
  { title: 'Taxa de conversão', value: '72%', change: '+5%', trend: 'up' },
];

const clients: Client[] = [
  {
    id: 1,
    name: 'Ana Bezerra',
    company: 'Bezerra & Associados',
    email: 'ana@bezerra.adv.br',
    phone: '(11) 99999-1001',
    status: 'Ativo',
    lastActivity: 'Reunião de onboarding – 04/02',
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    company: 'Mendes Logística',
    email: 'carlos@mendeslog.com',
    phone: '(21) 98888-2345',
    status: 'Prospect',
    lastActivity: 'Proposta enviada – 02/02',
  },
  {
    id: 3,
    name: 'Fernanda Lopes',
    company: 'Lopes Consultoria',
    email: 'fernanda@lopes.cons',
    phone: '(31) 97777-9087',
    status: 'Ativo',
    lastActivity: 'Audiência agendada – 05/02',
  },
  {
    id: 4,
    name: 'João Cardoso',
    company: 'Cardoso Tech',
    email: 'joao@cardoso.tech',
    phone: '(11) 93456-1827',
    status: 'Inativo',
    lastActivity: 'Contrato encerrado – 12/01',
  },
];

const tasks: Task[] = [
  {
    id: 1,
    title: 'Enviar minuta do contrato',
    dueDate: '04/02/2025',
    owner: 'Marina',
    status: 'Em andamento',
  },
  {
    id: 2,
    title: 'Agendar reunião com prospect',
    dueDate: '05/02/2025',
    owner: 'Ricardo',
    status: 'Atrasada',
  },
  {
    id: 3,
    title: 'Revisar petição inicial',
    dueDate: '06/02/2025',
    owner: 'Ana',
    status: 'Concluída',
  },
];

const activities: Activity[] = [
  {
    id: 1,
    description: 'Nota fiscal emitida para Bezerra & Associados',
    owner: 'Financeiro',
    date: '03/02/2025 às 10:24',
  },
  {
    id: 2,
    description: 'Follow-up enviado para Mendes Logística',
    owner: 'Ricardo',
    date: '03/02/2025 às 09:10',
  },
  {
    id: 3,
    description: 'Audiência confirmada no TJ-SP',
    owner: 'Ana',
    date: '02/02/2025 às 17:45',
  },
];

const statusFilters: ClientFilter[] = ['Todos', 'Ativo', 'Prospect', 'Inativo'];

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
    [],
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
              {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
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
