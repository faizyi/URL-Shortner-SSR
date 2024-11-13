import express from "express";
import URL from "../models/url.js";
const router = express.Router();

router.get("/", async(req, res)=>{
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({user: req.user._id});
    res.render("home", {
        urls : allUrls
    })
})

router.get("/signup", async(req, res)=>{
    res.render("signup")
})

router.get("/login", async(req, res)=>{
    res.render("login")
})


export default router;