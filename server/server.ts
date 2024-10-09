import express, { Request, Response } from 'express';
import connectDB from './config/database';

const app = express();
const port = 3000;
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});
console.log('Hello, world!');
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
