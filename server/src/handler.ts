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
