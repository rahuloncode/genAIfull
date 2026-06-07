import mongoose, { Schema } from "mongoose";

const blackListedToken = new Schema(
  {
    token: {
      type: "String",
      required: [true, "token is required to be added tro blacklist"],
    },
  },
  { timestamps: true },
);

const blacklistToken = mongoose.model("Blacklist", blackListedToken);

export default blacklistToken;
