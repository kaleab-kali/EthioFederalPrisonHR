import { Request, Response } from 'express';
const express = require('express');
const app = express();
const connectDB = require('./config/database');

const port = 3000;
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});
console.log('Hello, world!');
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
