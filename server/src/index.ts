import express from 'express';
import {
  createTask,
  listTasks,
  searchTasks,
  getTask,
  updateTask,
  deleteTask,
} from './handler';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', listTasks);
app.get('/api/tasks/search', searchTasks);
app.get('/api/tasks/:id', getTask);
app.post('/api/tasks', createTask);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
