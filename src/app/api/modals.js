import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    }
  },
  { timestamps: true }
);

const requestSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    },
    senderName: {
      type: String,
      required: true
    },
    senderImg: {
      type: String,
      required: true
    },
    recieverId: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const frindsSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    },
    recieverId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);
export const Friend = mongoose.models.Friend || mongoose.model("Friend", frindsSchema);