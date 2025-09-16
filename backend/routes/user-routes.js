import express from "express"
import { getUsersForSidebar } from "../controllers/message-controller.js"
import { protectRoute } from "../lib/tokenGen.js"
const router = express.Router()

router.get("/", protectRoute, getUsersForSidebar)

export default router
