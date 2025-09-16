import React, { useEffect } from "react"
import Messages from "./Messages"
import MessagesInput from "./MessageInput"
import NoChatSelected from "./NoChatSelected"
import { useConservation } from "../store/useConversation"
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConservation()
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span>To:</span>
            <span>{selectedConversation?.username}</span>
          </div>
          <Messages />
          <MessagesInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer
