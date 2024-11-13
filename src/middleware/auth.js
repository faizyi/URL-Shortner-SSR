import { getUser } from "../utils/auth.js";
export const restrict = async ( req, res, next )=>{
    const userUid = req.cookies.uid;
    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}

export const checkAuth = async ( req, res, next )=>{
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}