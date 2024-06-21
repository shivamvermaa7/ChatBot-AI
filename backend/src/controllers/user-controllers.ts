import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash, compare } from 'bcrypt' //to encrypt the password and compare to compare the existing password
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


export const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    try {
        //get all users from database
        const users = await User.find();

        return res.status(200).json({ message: "OK" , users})
        // 200 for ok
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
        
    }
};

export const userSignup = async (req:Request, res:Response, next: NextFunction) => {
    try {
        //user signup
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if ( existingUser ) return res.status(401).send("User already registered")
        const hashedPassword = await hash( password, 10 ); //10 is no of rounds of encryption
        const user = new User ({name , email, password: hashedPassword}); //creating new user but we have to encrypt the password recieved from the user
        await user.save();

        // clear previous cookies
        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });


        //assign token
        const token = createToken(user._id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        //use cookier parser to send the cookies from the backend to frontend
        res.cookie(COOKIE_NAME, token , {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });


        return res.status(201).json({ message: "OK" , name: user.name, email: user.email});
        // 200 for ok
    } catch (error) {
        console.log(error.response.data);
        return res.status(200).json({ message: "ERROR", cause: error.message });
        
    }
};

export const userLogin = async (req:Request, res:Response, next: NextFunction) => {
    try {
        //user login
        const {email,password} = req.body;
        const user = await User.findOne( {email} )
        if (!user) {
            return res.status(401).send("User not registerd")
        }
        const isPasswordCorrect = await compare(password,user.password);
        if (!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
        // clear previous cookies
        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });


        //assign token
        const token = createToken(user._id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        //use cookier parser to send the cookies from the backend to frontend
        res.cookie(COOKIE_NAME, token , {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({ message: "OK" , name: user.name, email: user.email});
        // 200 for ok
        //201 for the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
        //401 the request has not been applied because it lacks valid authentication credentials for the target resource.
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
        
    }
};


//to verify the user which is registerd or not and to veryify it and if it has logged out by mistake then it will be logged in by the help of token
export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };


  export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
