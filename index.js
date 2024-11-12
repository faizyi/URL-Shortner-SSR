import express from "express";
import path from "path"
import { fileURLToPath } from "url";
import urlRoutes from "./src/routes/url.js"
import staticRoutes from "./src/routes/static.js"
import connectToDB from "./src/connection/url.js";

const __fileName = fileURLToPath(import.meta.url)
const __dirName  = path.dirname(__fileName)
const app = express();
const PORT = 9001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirName, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirName, "src", "views"))

connectToDB();


app.use("/url", urlRoutes)
app.use("/", staticRoutes)

app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`)
})