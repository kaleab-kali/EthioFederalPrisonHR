import express, { Request, Response } from 'express';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';


const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
