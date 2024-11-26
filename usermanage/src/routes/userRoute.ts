import express, { Request, Response } from "express";
import session from "express-session";
import bodyParser from "body-parser";
const user_route = express();
import path from "path";
import nocache from "nocache";
import { sessionSecret } from "../config/config";
import {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  editLoad,
  updateProfile,
} from "../controllers/userController";
user_route.use(nocache());
user_route.use(
  session({ secret: sessionSecret, resave: false, saveUninitialized: true })
);


import  { isLogin,isLogout} from '../middleware/auth'
user_route.set("views",path.join(__dirname,'views'));
user_route.set("view engine", "ejs");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// const userController = require("../controllers/userController");

user_route.get("/sign", isLogout, loadRegister);

user_route.post("/sign",insertUser);

user_route.get("/", isLogout, loginLoad);
user_route.get("/login", isLogout, loginLoad);
user_route.post("/login", verifyLogin);

user_route.get("/home", isLogin, loadHome);
user_route.get("/logout", isLogin, userLogout);

user_route.get("/edit", isLogin,editLoad);
user_route.post("/edit", updateProfile);


export default user_route
