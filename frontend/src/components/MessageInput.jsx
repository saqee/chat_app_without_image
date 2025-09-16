import React, { useState } from "react"
import { BsSend } from "react-icons/bs"
import { useMessage } from "../hooks/useMessage"
const MessagesInput = () => {
  const [message, setMessage] = useState("")
  const { sendMessage, loading } = useMessage()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendMessage(message)
    setMessage("")
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full input input-bordered border text-sm rounded-lg bg-gray-700 border-gray-600 p-2.5"
        />
        <button className="absolute end-0 flex items-center inset-y-0 pe-3">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  )
}

export default MessagesInput
