import express, { Request, Response } from 'express';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import complaintRoute from './modules/complaint/routes/complaintRoute';
import appraisalRoute from './modules/appraisal/routes/appraisalRoute';
import salaryRaiseRoute from './modules/salaryRaise/routes/SalaryRaiseRoute';
import salaryLimitRoute from './modules/salaryRaise/routes/salaryLimitRoute';
import appraisalHistoryRoute from './modules/appraisal/routes/appraisalHistoryRoute';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoute);
app.use('/api/centers', centerRoute);
app.use('/api/complaint', complaintRoute);
app.use('/api/appraisal', appraisalRoute);
app.use('/api/appraisalHistory', appraisalHistoryRoute);
app.use('/api/salaryRaise', salaryRaiseRoute);
app.use('/api/salaryLimit', salaryLimitRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
