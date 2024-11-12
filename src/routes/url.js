import express from "express";
import { analyticsURL, deleteShortId, generateShortURL, redirectURL } from "../controllers/url.js";
const router = express.Router();

router
.post("/", generateShortURL)
.get("/:shortId", redirectURL)
.delete("/:id", deleteShortId)
.get("/analytics/:shortId", analyticsURL)
export default router