const mongoose = require('mongoose');
import colors from 'colors';
require('dotenv').config();
const connectDB = (): void => {
  mongoose.connect(process.env.MONGODB_URI as string, {
    family: 4,
    // useNewUrlParser: "true",
    // useUnifiedTopology: "true",
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(colors.blue('Connected to MongoDB'));
  });
};

module.exports = connectDB;
