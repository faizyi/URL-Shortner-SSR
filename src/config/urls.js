import dotenv from "dotenv"
dotenv.config();
const config = {
    appPort : process.env.APP_PORT,
    dbURI : process.env.MONGO_URL,
    jwtKey : process.env.SECRET_KEY,
}
export default config