import { Request, Response } from 'express';
import * as taskModel from './models/task';

export function createTask(req: Request, res: Response) {
  const { title, description, completed } = req.body;

  if (!title || title.trim() === '') {
    res.status(400).json({ error: 'title es requerido' });
    return;
  }

  const task = taskModel.add(
    title.trim(),
    description?.trim() || '',
    typeof completed === 'boolean' ? completed : false
  );

  res.status(201).json(task);
}

export function listTasks(_req: Request, res: Response) {
  res.json(taskModel.getAll());
}

export function searchTasks(req: Request, res: Response) {
  const q = (req.query.q as string || '').toLowerCase();
  if (!q) {
    res.json([]);
    return;
  }
  const tasks = taskModel.getAll().filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );
  res.json(tasks);
}

export function getTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const task = taskModel.getById(id);
  if (!task) {
    res.status(404).json({ error: 'tarea no encontrada' });
    return;
  }
  res.json(task);
}

export function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (title !== undefined && title.trim() === '') {
    res.status(400).json({ error: 'title no puede estar vacío' });
    return;
  }

  const existing = taskModel.getById(id);
  if (!existing) {
    res.status(404).json({ error: 'tarea no encontrada' });
    return;
  }

  const updated = taskModel.update(id, {
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(completed !== undefined && { completed }),
  });

  res.json(updated);
}

export function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const removed = taskModel.remove(id);
  if (!removed) {
    res.status(404).json({ error: 'tarea no encontrada' });
    return;
  }
  res.json({ message: 'tarea eliminada' });
}
