import React, { useEffect, useRef } from "react"
import Message from "./Message"
import { useGetMessage } from "../hooks/useGetMesage"
import MessageSkeleton from "./MessageSkelation"
const Messages = () => {
  const { messages, loading } = useGetMessage()
  const lastMessage = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.length > 0 &&
        messages?.map((message) => (
          <div className="" ref={lastMessage}>
            <Message message={message} key={message._id} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages?.length === 0 && (
        <p className="text-center">Send a message and start conversation</p>
      )}
    </div>
  )
}

export default Messages
