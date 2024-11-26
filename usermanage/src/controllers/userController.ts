
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
 const securePassword = async (password: string): Promise<string | void> => {
    try {
     
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error: any) {
      
      console.error(error.message);
    }
  };



  export const loadRegister = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render("sign");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  export const insertUser = async (req: Request, res: Response): Promise<void>=> {
    try {
      const spassword = await securePassword(req.body.password);
  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: spassword,
        is_admin: 0
      });
  
      const userData = await user.save();
  
      if (userData) {
        res.render("sign", { message: "Your registration has been successful" });
      } else {
        res.render("sign", { message: "Your registration has failed" });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

//login user method 


export const loginLoad = async (req: Request, res: Response): Promise<void> => {
  try {
    let logoutmsg = '';
    logoutmsg = req.query.logout ? String(req.query.logout) : '';
    res.render('login', { logout: logoutmsg });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const verifyLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      const userData = await User.findOne({ email });
  
      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (passwordMatch) {
          req.session.user_id = userData._id.toString();
          console.log(req.session.user_id);
          res.redirect("/home");
        } else {
          res.render("login", { message: "Email and password are incorrect" });
        }
      } else {
        res.render("login", { message: "Email and password are incorrect" });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };


  export const loadHome = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = await User.findById(req.session.user_id);
  
      res.render('home', { user: userData });
    } catch (error: any) {
      console.log(error.message);
    }
  };


export const userLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.session.destroy((err: Error) => {
      if (err) {
        console.log(err.message);
        return;
      }
      res.redirect('/login?logout=logout successfully');
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

  
//user edit and update 
export const editLoad = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id as string; // Ensure id is a string
      const userData = await User.findById(id);
  
      if (userData) {
        res.render('edit', { user: userData });
      } else {
        res.redirect('/home');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  

  export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id, name, email, mobile } = req.body;
  
      await User.findByIdAndUpdate(
        { _id: user_id },
        { $set: { name, email, mobile } }
      );
  
      res.redirect('/home');
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  

// module.exports={
//     loadRegister,
//     insertUser,
//     loginLoad,
//     verifyLogin,
//     loadHome,
//     userLogout,
//     editLoad,
//     updateProfile


// }