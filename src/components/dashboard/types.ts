export type ClientStatus = 'Ativo' | 'Inativo' | 'Prospect';

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  lastActivity: string;
};

export type TaskStatus = 'Em andamento' | 'Concluída' | 'Atrasada';

export type Task = {
  id: number;
  title: string;
  dueDate: string;
  owner: string;
  status: TaskStatus;
};

export type Activity = {
  id: number;
  description: string;
  owner: string;
  date: string;
};

export type Trend = 'up' | 'down';

export type Stat = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
};

export type OperationIndicator = {
  label: string;
  value: number;
};

export type ClientFilter = ClientStatus | 'Todos';
