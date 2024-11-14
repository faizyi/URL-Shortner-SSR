import { getUser } from "../utils/auth.js";
export const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // if (!token) {
        //     return res.status(401).send("Authentication token is missing");
        // }

        const user = getUser(token);
        // if (!user) {
        //     return res.status(401).send("Invalid token");
        // }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication middleware error:", error.message);
        return res.status(500).send("Internal Server Error");
    }
};

export const authorization = (roles = []) => {
    return (req, res, next) => {
        try {
            if (!req.user) return res.redirect("/login");
            if (!roles.includes(req.user.role)) {
                return res.status(403).send("Unauthorized");
            }
            next();
        } catch (error) {
            console.error("Authorization middleware error:", error.message);
            return res.status(500).send("Internal Server Error");
        }
    };
};


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