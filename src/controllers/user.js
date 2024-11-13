import User from "../../src/models/user.js"
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../utils/auth.js";
export const signup = async (req, res)=>{
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) return res.render("signup", {message: "Something Went Wrong"})
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/login")
}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render("login",{message: "Invalid Email or Password"});
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/")
}