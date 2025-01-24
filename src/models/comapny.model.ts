import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/comapny.interfaces";

const CompanySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    addresses: [
      {
        // for storing the address of the comapny
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
      },
    ],
    accountDetails: [
      {
        // for storing the accountdetailes of the company
        name: { type: String, required: true },
        accType: { type: String, required: true },
        mobileNo: { type: String, required: true },
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        isActive: { type: Boolean, required: true, default: true },
      },
    ],
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model<ICompany>("Company", CompanySchema);
