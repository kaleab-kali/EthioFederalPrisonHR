import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/database';
import employeeRoute from './modules/employee/routes/employeeRoutes';
import centerRoute from './modules/centers/routes/centerRoute';
import complaintRoute from './modules/complaint/routes/complaintRoute';
import appraisalRoute from './modules/appraisal/routes/appraisalRoute';
import appraisalHistoryRoute from './modules/appraisal/routes/appraisalHistoryRoute';

const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/employees', employeeRoute);
app.use('/api/centers', centerRoute);
app.use('/api/complaint', complaintRoute);
app.use('/api/appraisal', appraisalRoute);
app.use('/api/appraisalHistory', appraisalHistoryRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
