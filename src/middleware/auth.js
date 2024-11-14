import { getUser } from "../utils/auth.js";
export const authentication = async ( req, res, next )=>{
    try {
        const token = req.cookies.token;
        // req.user = null;
        const user = getUser(token);
        req.user = user;
        next();     
    } catch (error) {
        return error
    }
}

export const authorization = (roles = [])=>{
    return function( req, res, next){
        try {
            if(!req.user) return res.redirect("/login");
            if(!roles.includes(req.user.role)) res.send("Unauthorized")
            next();      
        } catch (error) {
            return error
        }
    }
}

// export const restrict = async ( req, res, next )=>{
//     const token = req.cookies.token;
//     if(!token) return res.redirect("/login");
//     const user = getUser(token);
//     if(!user) return res.redirect("/login");
//     req.user = user;
//     next();
// }

// export const checkAuth = async ( req, res, next )=>{
//     const token = req.cookies.token;
//     const user = getUser(token);
//     req.user = user;
//     next();
// }