import React from "react"
import { useAuthContext } from "../context/authContext"
import { useConservation } from "../store/useConversation"
const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConservation()
  const fromMe = authUser._id === message.senderId
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profielPic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profielPic} />
          </div>
        </div>
        <div className="chat-bubble">{message.message}</div>
      </div>
    </>
  )
}

export default Message
