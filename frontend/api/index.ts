import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Express API is running!' });
});

app.post('/predict', (req, res) => {
  res.json({ 
    message: 'Predict endpoint working',
    received: req.body 
  });
});

app.all('*', (req, res) => {
  res.json({ message: 'Route not found', path: req.path });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = 8000;
  app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
  });
}

// Vercel serverless handler
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};