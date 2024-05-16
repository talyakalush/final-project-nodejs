import mongoose from "mongoose";
import Image from "./Image.js";
import Address from "./Address.js";
import phoneRegex from "../../../utils/phoneRegex.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
    maxLength: 1024,
  },

  phone: {
    type: String,

    match: RegExp(phoneRegex),
  },

  email: {
    type: String,

    trim: true,

    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  },

  image: Image,

  address: Address,
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  loginAttempts: { type: Number, required: true, default: 0 },
  blockExpires: { type: Date, default: null },
});

const UserGoogle = mongoose.model("userg", UserSchema);

export default UserGoogle;
