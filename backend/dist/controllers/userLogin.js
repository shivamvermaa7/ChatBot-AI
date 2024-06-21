import User from "../models/User.js";
import { compare } from 'bcrypt' //to encrypt the password and compare to compare the existing password
;
import { createToken } from "../utils/token-manager.js";
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registerd");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        //assign token
        const token = createToken(user._id.toString(), user.email, "7d");
        //use cookier parser to send the cookies from the backend to frontend
        res.cookie("auth_token", token);
        return res.status(200).json({ message: "OK", id: user._id.toString() });
        // 200 for ok
        //201 for the request was successfully fulfilled and resulted in one or possibly multiple new resources being created.
        //401 the request has not been applied because it lacks valid authentication credentials for the target resource.
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=userLogin.js.map