import { Request, Response } from 'express';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

let tasks: Task[] = [];
let nextId = 1;

export function createTask(req: Request, res: Response) {
  const { title, description, completed } = req.body;

  if (!title || title.trim() === '') {
    res.status(400).json({ error: 'title es requerido' });
    return;
  }

  const task: Task = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() || '',
    completed: typeof completed === 'boolean' ? completed : false,
  };

  tasks.push(task);
  res.status(201).json(task);
}
