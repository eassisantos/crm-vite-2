import React from 'react';

export type TaskStatus = 'Em andamento' | 'Concluída' | 'Atrasada';

export type Task = {
  id: number;
  title: string;
  dueDate: string;
  owner: string;
  status: TaskStatus;
};

type TaskListProps = {
  tasks: Task[];
};

const taskStatusStyles: Record<TaskStatus, string> = {
  'Em andamento': 'bg-amber-100 text-amber-700',
  'Concluída': 'bg-emerald-100 text-emerald-700',
  Atrasada: 'bg-rose-100 text-rose-700',
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-slate-900/40">
      <h2 className="text-lg font-semibold text-white">Tarefas</h2>
      <ul className="mt-4 space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-xl bg-slate-900/60 p-4 text-sm text-slate-300">
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
  );
};

export default TaskList;
