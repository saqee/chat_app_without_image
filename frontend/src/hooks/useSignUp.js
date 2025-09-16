import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"

const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    })
    if (!success) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      })
      const data = await res.json()
      localStorage.setItem("chat_user", JSON.stringify(data))
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}

export default useSignUp

function handleErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username) {
    toast.error("fill all the fields")
    return false
  }
  if (password !== confirmPassword) {
    toast.error("password not match")
    return false
  }
  return true
}
