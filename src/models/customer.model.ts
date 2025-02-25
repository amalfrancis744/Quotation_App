import mongoose, { Schema } from "mongoose";
import { Icustomer } from "../interfaces/customer.interface";

const customerSchema: Schema<Icustomer> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

customerSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Customer = mongoose.model<Icustomer>("Customer", customerSchema);

export default Customer;
