import { create } from "zustand"
export const useConservation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setMessage: (messages) => set({ messages }),
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
}))
