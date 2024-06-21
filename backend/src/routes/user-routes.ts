import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

//request for users will be handled by user-controllers.ts in controllers
userRoutes.get("/",getAllUsers);
//to check or validate the user name email id password we use middlewares concept, these are the function which gets executed before a request is made used to check validation , tokens or cookies
//we will use express validator package for middleware
userRoutes.post("/signup", validate(signupValidator) ,userSignup);
userRoutes.post("/login", validate(loginValidator) ,userLogin);
userRoutes.get("/auth-status" ,verifyToken ,verifyUser);
userRoutes.get("/logout" ,verifyToken ,userLogout);
export default userRoutes;
 