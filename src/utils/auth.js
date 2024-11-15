// StateFull
// const userSessionId = new Map();
import jwt from "jsonwebtoken";
import config from "../config/urls.js";
// const SECRET_KEY = "bhjyfdvcvcvcftdyudyugediuiasjbhbhjvadowyddfvavsgh"

export const setUser = (user)=>{
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, config.jwtKey)
}

export const getUser = (token)=>{
    if(!token) return null;
    try {
        return jwt.verify(token, config.jwtKey) 
    } catch (error) {
        return null;
    }
    // const userData = userSessionId.get(id)
    // if (!userData) {
    //     console.log("No user found for id:", id);
    // }
    // return userData;
}