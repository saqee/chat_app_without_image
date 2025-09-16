import mongoose from "mongoose"

export const Db = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("db connect")
  } catch (error) {
    console.log(error)
  }
}
