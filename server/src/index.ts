import express from 'express';
import { createTask } from './handler';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/tasks', createTask);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
