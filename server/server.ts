import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import leaveBalanceRoute from './modules/leave/routes/leaveBalanceRoute';
import leaveInfoRoute from './modules/leave/routes/leaveRoute';
import documentRoute from './modules/documents/routes/documentRoute';
import retirementsRoute from './modules/retirement/routes/retirementRoute';
import colors from 'colors';
import fileUpload from 'express-fileupload';


const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
connectDB();
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoute);
app.use('/api/centers', centerRoute);
app.use('/api/leavebalances', leaveBalanceRoute);
app.use('/api/leaveinfo', leaveInfoRoute);
app.use('/api/documents', documentRoute);
app.use('/api/retirements',retirementsRoute);


app.listen(port, () => {
  console.log(colors.cyan(`Server is running on port ${port}`));
});
