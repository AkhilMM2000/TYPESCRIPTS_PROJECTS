import express from 'express';
import path from "path";

import bodyParser from 'body-parser';
import { router, router as taskRouter } from './routes/task';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views",path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));


// Use task routes
app.use('/', router);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
