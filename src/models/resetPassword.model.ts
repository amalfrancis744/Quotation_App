import mongoose, { Schema } from "mongoose";
import { IResetPassword } from "../interfaces/resetPassword.interfaces";

const ResetPasswordSchema: Schema<IResetPassword> =
  new mongoose.Schema<IResetPassword>(
    {
      userId: {
        type: String,
        required: true,
      },
      resetToken: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
ResetPasswordSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const ResetPassword = mongoose.model<IResetPassword>(
  "ResetPassword",
  ResetPasswordSchema
);

export default ResetPassword;
