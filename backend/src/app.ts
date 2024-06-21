import express from "express";
import { config } from "dotenv"; //to connect mongodb database securely
import morgan from 'morgan' //use to give log description of what was the request and how it was handled
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; //to remove cors error this is done to because the login is in 5173 host and home is in 5000 so it gives error
config();
const app = express();
const BASE_URL = process.env.BASE_URL

//middlewares
app.use(cors({ origin: BASE_URL, credentials: true }));// this is because from end send req from 5723 to localhost5000 this will give error, so to by pass that we use this 
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production mode
app.use(morgan("dev"));


app.use("/api/v1" , appRouter); //request -> api/v1 handled by->approuter in index.ts and in that if it is user it will be handled by user-router.ts


export default app;

//here we defined the app and exported it and can import in index.ts