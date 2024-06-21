//there are 4 type of request which are mainly used in backend dev
//GET -> we want to get some data
//PUT -> update, mutate or modify data
//POST -> Send some data or block
//DELETE -> To send some data to delete 
//Major 4 verbs in http
/*
//request, response to send , next /hello is the location where we want the route
app.get("/hello", (req,res,next) => {
  return res.send("Hello");
})

//to read the data send by user we use, and in post the (req.body(for body type data).id_name)
app.use(express.json());

//the user can send some data in post
app.post("/hello", (req,res,next) => {
  console.log(req.body.name);
  return res.send("Hello");
})
//to modify some backend etc
app.put("/hello", (req,res,next) => {
  console.log(req.body.name);
  return res.send("Hello");
})
//to get or delete user specific data we use /user/:id this is called dynamic routing, or dynamic request
app.delete("/user/:id", (req,res,next) => {
  console.log(req.params.id);
  return res.send("Hello");
})
*/
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connection and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(5000, () => console.log("Server Open & Connected To Database "));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map