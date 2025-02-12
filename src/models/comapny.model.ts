import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/comapny.interfaces";

const AddressSchema = new Schema({
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  district: { type: String },
  state: { type: String },
  isActive: { type: Boolean, default: false },
});

// Add a transform to rename `_id` to `id` for addresses
AddressSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Rename `_id` to `id`
    delete ret._id; // Remove `_id`
  },
});

// Define the AccountDetails schema
const AccountDetailsSchema = new Schema({
  name: { type: String, required: true },
  accType: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
});

// Add a transform to rename `_id` to `id` for accountDetails
AccountDetailsSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Rename `_id` to `id`
    delete ret._id; // Remove `_id`
  },
});

// Define the Company schema
const CompanySchema: Schema<ICompany> = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    state: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    addresses: [AddressSchema], // Use the Address schema
    accountDetails: [AccountDetailsSchema], // Use the AccountDetails schema
    website: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Add a transform to rename `_id` to `id` for the Company schema
CompanySchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Rename `_id` to `id`
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove version key (if not already disabled)
  },
});

export const Company = mongoose.model<ICompany>("Company", CompanySchema);
