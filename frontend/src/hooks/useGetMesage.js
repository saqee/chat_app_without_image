import { useEffect, useState } from "react"
import { useConservation } from "../store/useConversation"

export const useGetMessage = () => {
  const { messages, setMessage, selectedConversation } = useConservation()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/messages/${selectedConversation._id}`)
        const data = await res.json()
        setMessage(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (selectedConversation?._id) getMessages()
  }, [selectedConversation?._id, setMessage])
  return { messages, loading }
}
