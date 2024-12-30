import express, { Request, Response } from 'express';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import leaveBalanceRoute from './modules/leave/routes/leaveBalanceRoute';
import leaveInfoRoute from './modules/leave/routes/leaveRoute';
import documentRoute from './modules/documents/routes/documentRoute';
import retirementsRoute from './modules/retirement/routes/retirementRoute';
import colors from 'colors';
import fileUpload from 'express-fileupload';
import complaintRoute from './modules/complaint/routes/complaintRoute';
import appraisalRoute from './modules/appraisal/routes/appraisalRoute';
import salaryRaiseRoute from './modules/salaryRaise/routes/SalaryRaiseRoute';
import salaryLimitRoute from './modules/salaryRaise/routes/salaryLimitRoute';
import appraisalHistoryRoute from './modules/appraisal/routes/appraisalHistoryRoute';

const app = express();
const port = 3000;

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
app.use('/api/complaint', complaintRoute);
app.use('/api/appraisal', appraisalRoute);
app.use('/api/appraisalHistory', appraisalHistoryRoute);
app.use('/api/salaryRaise', salaryRaiseRoute);
app.use('/api/salaryLimit', salaryLimitRoute);
app.listen(port, () => {
  console.log(colors.cyan(`Server is running on port ${port}`));
});
