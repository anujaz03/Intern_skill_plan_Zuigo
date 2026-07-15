import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/types";
import { COLLECTIONS, VALIDATION_MESSAGES } from "@/utils/constants";

// Define the User Document interface for Mongoose type safety
export interface IUserDocument extends Omit<IUser, "_id">, Document {
  // Password field is kept in document structure and will be hashed later in Commit 2
  password?: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, VALIDATION_MESSAGES.NAME_REQUIRED],
      minlength: [3, VALIDATION_MESSAGES.NAME_MIN_LENGTH],
      trim: true,
    },
    email: {
      type: String,
      required: [true, VALIDATION_MESSAGES.EMAIL_REQUIRED],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        VALIDATION_MESSAGES.EMAIL_INVALID,
      ],
    },
    password: {
      type: String,
      required: [true, VALIDATION_MESSAGES.PASSWORD_REQUIRED],
      minlength: [8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH],
      // NOTE: Password hashing logic using bcrypt will be implemented in the authentication commit
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          // If phone is provided, validate it contains only digits
          if (!v || v === "") return true;
          return /^[0-9]+$/.test(v);
        },
        message: VALIDATION_MESSAGES.PHONE_DIGITS_ONLY,
      },
    },
    companyName: {
      type: String,
      trim: true,
    },
    businessType: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    companySetupCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    // Auto-generate createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Prevent compiling User model multiple times in serverless/HMR development hot reloads
const User: Model<IUserDocument> =
  mongoose.models[COLLECTIONS.USERS] ||
  mongoose.model<IUserDocument>(COLLECTIONS.USERS, UserSchema);

export default User;
export { User };
