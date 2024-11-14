import express from "express";
import URL from "../models/url.js";
import { authorization } from "../middleware/auth.js";
const router = express.Router();

router.get("/admin/urls", authorization(["ADMIN"]), async(req, res)=>{
    const allUrls = await URL.find({});
    res.render("home", {
        urls : allUrls
    })
})

router.get("/", authorization(["USER", "ADMIN"]), async(req, res)=>{
    const allUrls = await URL.find({user: req.user._id});
    res.render("home", {
        urls : allUrls
    })
})

router.get("/signup", async(req, res)=>{
    if(req.user) return res.redirect("/")
    res.render("signup")
})

router.get("/login", async(req, res)=>{
    if(req.user) return res.redirect("/")
    res.render("login")
})


export default router;