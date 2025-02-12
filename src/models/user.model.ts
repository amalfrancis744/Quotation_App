import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Rename `_id` to `id`
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove version key (if not already disabled)
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);