import type {
  Activity,
  Client,
  ClientFilter,
  Stat,
  Task,
} from '../components/dashboard/types';

export const stats: Stat[] = [
  { title: 'Clientes ativos', value: '128', change: '+12%', trend: 'up' },
  { title: 'Novos leads', value: '37', change: '+8%', trend: 'up' },
  { title: 'Casos em andamento', value: '54', change: '-3%', trend: 'down' },
  { title: 'Taxa de conversão', value: '72%', change: '+5%', trend: 'up' },
];

export const clients: Client[] = [
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

export const tasks: Task[] = [
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

export const activities: Activity[] = [
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

export const statusFilters: ClientFilter[] = ['Todos', 'Ativo', 'Prospect', 'Inativo'];
