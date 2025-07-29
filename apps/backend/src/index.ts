import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript backend!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
