import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = (): void => {
  console.log(colors.cyan('Connecting to MongoDB...'));
  
  console.log("uri",process.env.MONGODB_URI);

  mongoose.connect(process.env.MONGODB_URI as string, {
    family: 4,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(colors.blue('Connected to MongoDB'));
  });
};

export default connectDB;
