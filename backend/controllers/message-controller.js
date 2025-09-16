import { generateToken } from "../lib/tokenGen.js"
import User from "../models/users.model.js"
import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body

    const { id: receiverId } = req.params
    const senderId = req.user._id
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    return res.status(201).json(newMessage)
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}

export const getMessage = async (req, res) => {
  try {
    const { id: userChatId } = req.params
    const senderId = req.user._id
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userChatId] },
    }).populate("messages")

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUser = req.user._id
    const allUser = await User.find({
      _id: { $ne: loggedUser },
    })
    return res.status(400).json(allUser)
  } catch (error) {
    return res.status(400).json({
      error: "server error",
    })
  }
}
