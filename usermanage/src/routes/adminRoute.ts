import express, { Request, Response } from 'express';
import session from 'express-session';
import  {isLogin,isLogout } from '../middleware/adminauth'; 
// Correct imports if using TS in the middleware
import bodyParser from 'body-parser';
import {sessionSecret}  from '../config/config';  // Adjust to import sessionSecret from the config
import { loadLogin, verifyLogin, loadDashboard, logout, adminDashboard, newUserLoad, addUser, editUserLoad, updateUsers, deleteUser } from '../controllers/adminController';
import path from "path";
const admin_route = express();
declare module 'express-session' {
  interface SessionData {
    user_id: string; // Add the custom session field here
  }
}
// Session configuration
admin_route.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to parse JSON and URL-encoded data
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
admin_route.set("views",path.join(__dirname,'views'));
admin_route.set('view engine', 'ejs');

// Define routes
admin_route.get('/', isLogout, loadLogin);
admin_route.post('/', verifyLogin);
admin_route.get('/home', isLogin, loadDashboard);
admin_route.get('/logout', logout);
admin_route.get('/dashboard', isLogin, adminDashboard);
admin_route.get('/new-user', isLogin, newUserLoad);
admin_route.post('/new-user', addUser);
admin_route.get('/edit-user', isLogin, editUserLoad);
admin_route.post('/edit-user', updateUsers);
admin_route.get('/delete-user', deleteUser);

// Catch-all route to redirect to login if not matched
admin_route.get('*', (req: Request, res: Response) => {
  res.redirect('/admin');
});

export default admin_route;
