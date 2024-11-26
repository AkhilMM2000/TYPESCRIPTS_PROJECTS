import { Request, Response, NextFunction } from "express";

export const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {
      next(); // Proceed if the user is logged in
    } else {
      res.redirect("/admin"); // Redirect to the admin login if not logged in
    }
  } catch (error) {
    console.error(error);
  }
};

export const isLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {
      res.redirect("/admin/home"); // Redirect to the admin home if already logged in
    } else {
      next(); // Proceed if the user is not logged in
    }
  } catch (error) {
    console.error(error);
  }
};

// export default {
//   isLogin,
//   isLogout,
// };
