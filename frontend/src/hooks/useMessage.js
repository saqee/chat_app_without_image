import { useState } from "react"
import { useConservation } from "../store/useConversation"

export const useMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessage, selectedConversation } = useConservation()
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      )
      const data = await res.json()
      setMessage([...messages, data])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
