import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

//domain/api/v1 will be handled here


const appRouter = Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user 
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats


export default appRouter;