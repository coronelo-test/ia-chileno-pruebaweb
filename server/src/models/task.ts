type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const tasks: Task[] = [];
let nextId = 1;

export function add(title: string, description: string, completed: boolean): Task {
  const task: Task = { id: nextId++, title, description, completed };
  tasks.push(task);
  return task;
}

export function getById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function getAll(): Task[] {
  return [...tasks];
}

export function update(
  id: number,
  data: Partial<Omit<Task, 'id'>>
): Task | undefined {
  const task = tasks.find((t) => t.id === id);
  if (!task) return undefined;
  Object.assign(task, data);
  return task;
}

export function remove(id: number): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
