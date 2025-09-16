import React from "react"
import Conservation from "./Conservation"
import useGetConversation from "../hooks/useGetConservation"
import { getRandomEmoji } from "../store/emojis"
const Conservations = () => {
  const { loading, conservations } = useGetConversation()
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conservations.map((conservation, idx) => (
        <Conservation
          key={conservation._id}
          conservation={conservation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conservations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default Conservations
