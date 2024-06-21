import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";


//Protected API only protect user can access
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator) , verifyToken , generateChatCompletion); //this is for moving to chat section after verfing the token
chatRoutes.get("/all-chats",verifyToken, sendChatsToUser)
chatRoutes.delete("/delete",verifyToken, deleteChats)
export default chatRoutes;