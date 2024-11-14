import express from "express";
import path from "path"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import urlRoutes from "./src/routes/url.js"
import staticRoutes from "./src/routes/static.js"
import usersRoutes from "./src/routes/user.js"
import connectToDB from "./src/connection/url.js";
import { authentication, authorization } from "./src/middleware/auth.js";

const __fileName = fileURLToPath(import.meta.url)
const __dirName  = path.dirname(__fileName)
const app = express();
const PORT = 9001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirName, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirName, "src", "views"))
app.use(authentication);

try {
    connectToDB();
  } catch (error) {
    console.error("Database connection error:", error);
  }

// app.get("/", (req,res)=>{
//     res.send("server")
// })
app.use("/url", authorization(["USER"]), urlRoutes)
app.use("/", staticRoutes)
app.use("/user", usersRoutes)

app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`)
})

// export default app;

