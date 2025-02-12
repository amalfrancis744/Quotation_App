import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";

const AdminSchema: Schema<IAdmin> = new mongoose.Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Add a transform to rename `_id` to `id` for adminDetails
AdminSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
