import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import authRotes from "./routes/auth-routes.js"
import messageRotes from "./routes/message-routes.js"
import userRoutes from "./routes/user-routes.js"
import { Db } from "./lib/db.js"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cookieParser())
/* app.use(
  cors({
    origin: "http://localhost:5173",
  })
) */

app.use("/api/auth", authRotes)
app.use("/api/messages", messageRotes)
app.use("/api/users", userRoutes)
app.listen(process.env.PORT, () => {
  console.log("server connected")
  Db()
})
