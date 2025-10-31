import React, { useMemo, useState } from 'react';

type Trend = 'up' | 'down';

type Stat = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
};

type ClientStatus = 'Ativo' | 'Inativo' | 'Prospect';

type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  lastActivity: string;
};

type Task = {
  id: number;
  title: string;
  dueDate: string;
  owner: string;
  status: 'Em andamento' | 'Concluída' | 'Atrasada';
};

type Activity = {
  id: number;
  description: string;
  owner: string;
  date: string;
};

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

const statusFilters: Array<ClientStatus | 'Todos'> = ['Todos', 'Ativo', 'Prospect', 'Inativo'];

const trendColors: Record<Trend, string> = {
  up: 'text-emerald-600 bg-emerald-100',
  down: 'text-rose-600 bg-rose-100',
};

const taskStatusStyles: Record<Task['status'], string> = {
  'Em andamento': 'bg-amber-100 text-amber-700',
  'Concluída': 'bg-emerald-100 text-emerald-700',
  Atrasada: 'bg-rose-100 text-rose-700',
};

const App: React.FC = () => {
  const [clientFilter, setClientFilter] = useState<(typeof statusFilters)[number]>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesStatus =
        clientFilter === 'Todos' ? true : client.status === clientFilter;
      const matchesTerm = [client.name, client.company, client.email]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesTerm;
    });
  }, [clientFilter, searchTerm]);

  const activeClients = useMemo(
    () => clients.filter((client) => client.status === 'Ativo').length,
    [],
  );

  const prospects = useMemo(
    () => clients.filter((client) => client.status === 'Prospect').length,
    [],
  );

  const delayedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'Atrasada').length,
    [],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
              CRM Jurídico
            </p>
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
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-400">
            Visão geral
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40"
              >
                <p className="text-sm text-slate-300">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                <span
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${trendColors[stat.trend]}`}
                >
                  {stat.trend === 'up' ? '▲' : '▼'} {stat.change}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Clientes</h2>
              <span className="text-sm text-slate-400">
                {filteredClients.length} de {clients.length} clientes
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-slate-900/40 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-900/60 px-3 py-2">
                <span className="text-lg text-slate-500">🔍</span>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="Buscar por nome, empresa ou e-mail"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => setClientFilter(status)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                      clientFilter === status
                        ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-900/40 text-slate-300 hover:bg-slate-900/70'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {filteredClients.map((client) => (
                <article
                  key={client.id}
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
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
                      {client.status}
                    </span>
                    <p className="text-slate-400">{client.lastActivity}</p>
                    <button className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
                      Ver detalhes
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
              <h2 className="text-lg font-semibold text-white">Saúde da operação</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3">
                  <dt>Clientes ativos</dt>
                  <dd className="font-semibold text-white">{activeClients}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3">
                  <dt>Prospects em negociação</dt>
                  <dd className="font-semibold text-white">{prospects}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3">
                  <dt>Tarefas atrasadas</dt>
                  <dd className="font-semibold text-white">{delayedTasks}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
              <h2 className="text-lg font-semibold text-white">Tarefas</h2>
              <ul className="mt-4 space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl bg-slate-900/60 p-4 text-sm text-slate-300"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{task.title}</p>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${taskStatusStyles[task.status]}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
                      {task.dueDate} · responsável: {task.owner}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
              <h2 className="text-lg font-semibold text-white">Atividades recentes</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-xl bg-slate-900/60 p-4"
                  >
                    <p className="font-medium text-white">{activity.description}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                      {activity.date} · {activity.owner}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default App;
