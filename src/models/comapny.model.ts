import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/comapny.interfaces";

const CompanySchema: Schema<ICompany> = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    mobileNo:{
      type:String,
    },
    state:{
      type:String
    },
    email:{
      type:String
    },
    addresses: [
      {
      
        address: { type: String },
        city: { type: String, },
        pincode: { type: String, },
        district: { type: String, },
        state: { type: String, },
        isActive: { type: Boolean, required: true, default: true },
      },
    ],
    accountDetails: [
      {
       
        name: { type: String, required: true },
        accType: { type: String, required: true },
        mobileNo: { type: String, required: true },
        email: {
          type: String,
          required: true,
        },
      },
    ],
    website: {
      type: String,
    },
    isDeleted: { 
      type: Boolean, 
      default: false, 
      required: true 
    },
    deletedAt: { 
      type: Date, 
      default: null 
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model<ICompany>("Company", CompanySchema);
