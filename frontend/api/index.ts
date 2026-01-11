// Use "type: module" in package.json to use ES modules
import express, { Request, Response } from 'express';

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

app.get('*', (req, res) => {
  res.json({ message: 'Route not found', path: req.path });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = 8000;
  app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
  });
}

// Export for Vercel serverless
export default app;