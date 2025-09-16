import { useEffect, useState } from "react"
import toast from "react-hot-toast"
export const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [conservations, setConservations] = useState([])
  useEffect(() => {
    const getConservations = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/users")
        const data = await res.json()
        console.log(1, data)
        setConservations(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getConservations()
  }, [])
  return { loading, conservations }
}

export default useGetConversation
