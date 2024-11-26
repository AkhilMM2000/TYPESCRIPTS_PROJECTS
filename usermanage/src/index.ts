import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import nocache from 'nocache';
import path from 'path';

const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/usermanage')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.log(err.message));

// Routes
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';

// Middleware to use nocache
app.use(nocache());
// app.set("views",path.join(__dirname,'views'));
// app.set('view engine', 'ejs');
// Static files
app.use('/static', express.static(path.join(__dirname, "../public")));

const port: number = 3000;

// User route
app.use('/', userRoute);

// Admin route
app.use('/admin', adminRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
