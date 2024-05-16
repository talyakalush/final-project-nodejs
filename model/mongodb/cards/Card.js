import mongoose from "mongoose";
import Image from "../users/Image.js";
import phoneRegex from "../../../utils/phoneRegex.js";
import { DEFAULT_REQUIRED_STRING_VALIDATION } from "../helper/defaultStringValidation.helper.js";

const CardSchema = new mongoose.Schema({
  title: DEFAULT_REQUIRED_STRING_VALIDATION,
  subtitle: DEFAULT_REQUIRED_STRING_VALIDATION,
  description: {
    ...DEFAULT_REQUIRED_STRING_VALIDATION,
    maxLength: 1024,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(phoneRegex),
  },
  email: {
    type: String,
    required: true,
    trim: true,

    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  },
  web: {
    type: String,
    required: true,
    match: RegExp(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+/
    ),
  },
  image: Image,

  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  price: {
    type: Number,
    minLength: 1,
    maxLength: 10,
    required: true,
  },
  area: DEFAULT_REQUIRED_STRING_VALIDATION,

  style: DEFAULT_REQUIRED_STRING_VALIDATION,
  type: DEFAULT_REQUIRED_STRING_VALIDATION,
  likes: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Card = mongoose.model("card", CardSchema);

export default Card;
