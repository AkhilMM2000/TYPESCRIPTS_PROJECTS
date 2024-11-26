
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

export const loadLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render("admlogin"); // Render the admin login page
  } catch (error: any) {
    console.error(error.message); // Log any errors
  }
};

  
export const verifyLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body; // Destructure email and password from the request body

    // Find user by email
    const userData = await User.findOne({ email: email });

    if (userData) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        // Check if user is an admin
        if (userData.is_admin === 0) {
          res.render("admlogin", { message: "Email and password are incorrect" });
        } else {
          // If login is successful, store the user ID in the session
          // req.session.user_id = userData._id;
          req.session.user_id = userData._id.toString(); 
          res.redirect("/admin/home");
        }
      } else {
        res.render("admlogin", { message: "Email and password are incorrect" });
      }
    } else {
      res.render("admlogin", { message: "Email and password are incorrect" });
    }
  } catch (error: any) {
    console.error(error.message);
  }
};


  export const loadDashboard=async(req:Request,res:Response):Promise<void>=>{
          
        try {
         const userData = await User.findById({_id:req.session.user_id})
            res.render('admhome',{admin:userData})

        } catch (error:any) {
            console.log(error.message);
        }


  }

  
  export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
      // Destroy the session
      req.session.destroy((err: any) => {
        if (err) {
         
          return res.status(500).send("An error occurred while logging out.");
        }
  
        res.redirect("/admin");
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("An error occurred while logging out.");
    }
  };
  

  export const adminDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
    
      const usersData = await User.find({ is_admin: 0 });
  
    
      res.render("admdashboard", { users: usersData });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("An error occurred while fetching user data.");
    }
  };
//add new user by admin

export const newUserLoad = async (req: Request, res: Response): Promise<void> => {
  try {
    // Render the 'admadduser' view when loading the form for adding a new user
    res.render("admadduser");
  } catch (error: any) {
    // Log and handle any errors
    console.error(error.message);
    res.status(500).send("An error occurred while loading the user creation form.");
  }
};



 const securePassword = async (password: string): Promise<string | void> => {
  try {
   
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error: any) {
    
    console.error(error.message);
  }
};


export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const spassword = await securePassword(req.body.password);

    // Create a new user object
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassword,
      is_admin: 0,  
    });

    // Save the user to the database
    const userData = await user.save();

    if (userData) {
   
      res.redirect("/admin/dashboard");
    } else {
   
      res.render("admadduser", { message: "Something went wrong, please try again." });
    }
  } catch (error: any) {
 
    console.error(error.message);
    res.render("admadduser", { message: "An error occurred while adding the user." });
  }
};
    //edit user details by admin
    
    export const editUserLoad = async (req: Request, res: Response): Promise<void> => {
      try {
      
        const id = req.query.id as string;  // Type assertion since 'id' will be a string
    
        // Find the user by ID
        const userdata = await User.findById(id);
    
     
        if (userdata) {
        
          res.render("admedituser", { user: userdata });
        } else {
          // Redirect to the dashboard if the user is not found
          res.redirect("/admin/dashboard");
        }
      } catch (error: any) {
       
        console.log(error.message);
        res.redirect("/admin/dashboard"); 
      }
    };
    
export const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure the required fields from the request body
    const { id, name, email, mobile } = req.body;

    // Find the user by ID and update the name, email, and mobile
    await User.findByIdAndUpdate(
      { _id: id },
      { $set: { name, email, mobile } }
    );

    // Redirect to the dashboard after successful update
    res.redirect("/admin/dashboard");
  } catch (error: any) {
    // Log the error and handle gracefully
    console.log(error.message);
    // Optionally, redirect to the dashboard on error or show an error message
    res.redirect("/admin/dashboard"); 
  }
};

//delete users
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.query;

    
    if (!id || typeof id !== "string") {
      res.status(400).send("Invalid or missing user ID.");
      return;
    }

   
    await User.deleteOne({ _id: id });

    // Redirect to the admin dashboard after successful deletion
    res.redirect("/admin/dashboard");
  } catch (error: any) {
   
    console.log(error.message);
   
  }
};

  // export default{
  //   loadLogin,
  //   verifyLogin,
  //   loadDashboard,
  //   logout,
  //   adminDashboard,
  //   newUserLoad,
  //   addUser,
  //   editUserLoad,
  //   updateUsers,
  //   deleteUser
  // }
