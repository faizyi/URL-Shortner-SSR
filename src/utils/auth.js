// StateFull
// const userSessionId = new Map();
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";
// const SECRET_KEY = "bhjyfdvcvcvcftdyudyugediuiasjbhbhjvadowyddfvavsgh"

export const setUser = (user)=>{
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY)
}

export const getUser = (token)=>{
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY) 
    } catch (error) {
        return null;
    }
    // const userData = userSessionId.get(id)
    // if (!userData) {
    //     console.log("No user found for id:", id);
    // }
    // return userData;
}