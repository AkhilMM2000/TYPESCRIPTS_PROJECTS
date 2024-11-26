import { Request, Response, NextFunction } from "express";

export const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {
      next(); // Proceed if the user is logged in
    } else {
      res.redirect("/"); // Redirect to the login page if not logged in
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const isLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {
      res.redirect("/home"); // Redirect to the home page if already logged in
    } else {
      next(); // Proceed if the user is not logged in
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

// export default {
//   isLogin,
//   isLogout,
// };
