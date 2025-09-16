import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
    },
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User
