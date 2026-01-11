// Use "type: module" in package.json to use ES modules
import express from 'express';
const app = express();
const port = 8000;

// Middleware
app.use(express.json());

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Express API is running!' });
});

app.post('/predict', (req, res) => {
  // Basic test endpoint
  res.json({ 
    message: 'Predict endpoint working',
    received: req.body 
  });
});

app.listen(port, () => {
  console.log(`Express API listening on port ${port}`);
});

export default app;