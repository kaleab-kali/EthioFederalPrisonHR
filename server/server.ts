import express, { Request, Response } from 'express';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import leaveBalanceRoute from './modules/leave/routes/leaveBalanceRoute';
import leaveInfoRoute from './modules/leave/routes/leaveRoute';
import documentTypes from './modules/documents/routes/documentRoute';
import colors from 'colors';


const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoute);
app.use('/api/centers', centerRoute);
app.use('/api/leavebalances', leaveBalanceRoute);
app.use('/api/leaveinfo', leaveInfoRoute);
app.use('/api/documents', documentTypes);


app.listen(port, () => {
  console.log(colors.cyan(`Server is running on port ${port}`));
});
