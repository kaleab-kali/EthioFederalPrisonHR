import express, { Request, Response } from 'express';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import leaveBalanceRoute from './modules/leave/routes/leaveBalanceRoute';
import leaveInfoRoute from './modules/leave/routes/leaveRoute';
import documentRoute from './modules/documents/routes/documentRoute';
import retirementsRoute from './modules/retirement/routes/retirementRoute';
import colors from 'colors';
import cors from 'cors';
import complaintRoute from './modules/complaint/routes/complaintRoute';
import appraisalRoute from './modules/appraisal/routes/appraisalRoute';
import salaryRaiseRoute from './modules/salaryRaise/routes/SalaryRaiseRoute';
import salaryLimitRoute from './modules/salaryRaise/routes/salaryLimitRoute';
import appraisalHistoryRoute from './modules/appraisal/routes/appraisalHistoryRoute';
import titleRoute from './modules/organization/routes/titleRoute';
import positionRoute from './modules/organization/routes/positionRoute';
import departmentRoute from './modules/organization/routes/departmentRoute';
import path from 'path';
import dashboardRoute from './modules/dashboard/routes/dashboardRoute'



const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));

connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/employees', employeeRoute);//
app.use('/api/centers', centerRoute);//
app.use('/api/leavebalances', leaveBalanceRoute);//
app.use('/api/leaveinfo', leaveInfoRoute);//
app.use('/api/documents', documentRoute);//
app.use('/api/retirements', retirementsRoute);
app.use('/api/complaint', complaintRoute);//
app.use('/api/appraisal', appraisalRoute);//
app.use('/api/appraisalHistory', appraisalHistoryRoute);//
app.use('/api/salaryRaise', salaryRaiseRoute);//
app.use('/api/salaryLimit', salaryLimitRoute);//
//dynamics
app.use('/api/org/title', titleRoute);//
app.use('/api/org/position', positionRoute);//
app.use('/api/org/department', departmentRoute);//
app.use('/api/dashboard', dashboardRoute);//
app.listen(port, () => {
  console.log(colors.cyan(`Server is running on port ${port}`));
});
