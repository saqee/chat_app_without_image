import { generateToken } from "../lib/tokenGen.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "password not match",
      })
    }
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({
        error: "user alreay existed",
      })
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    })
    if (newUser) {
      await generateToken(newUser._id, res)
    }
    await newUser.save()

    return res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    })
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({
        error: "user not found",
      })
    }
    const confirmPasword = await bcrypt.compare(password, user.password)

    if (!confirmPasword) {
      return res.status(400).json({
        error: "password not match",
      })
    }

    await generateToken(user._id, res)

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}
export const logout = async (req, res) => {
  try {
    res.cookie("jwt_v1", "", {
      maxAge: 0,
    })
    return res.status(200).json({
      message: "logout successfully",
    })
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}
