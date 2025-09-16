import { useState } from "react"
import { useAuthContext } from "../context/authContext"
import toast from "react-hot-toast"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const login = async (username, password) => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      console.log(data)

      localStorage.setItem("chat_user", JSON.stringify(data))
      setAuthUser(data)
      toast.success("logout successfully")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, login }
}

export default useLogin
