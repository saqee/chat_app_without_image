import jwt from "jsonwebtoken"
import User from "../models/users.model.js"

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "7d",
  })
  res.cookie("jwt_v1", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
}

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_v1
    if (!token) {
      return res.status(500).json({ error: "unauthorized" })
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    if (!decoded) {
      return res.status(500).json({ error: "token issue" })
    }

    const user = await User.findById(decoded.userId).select("-password")
    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ error: "internal server error" })
  }
}
