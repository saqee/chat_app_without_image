import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/authContext"
function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
