import mongoose ,{ Schema } from "mongoose";
import {  IQuotation } from "../interfaces/quotation.interface";

const quotationSchema:Schema<IQuotation> = new mongoose.Schema<IQuotation>({
  contractor: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  // Additional Fields
  jNo: { type: String ,unique:true},
  party: { type: String },
  email: { type: String },
  billQty: { type: Number },
  salesMan: { type: String },
  grossAmount: { type: Number },
  netAmount: { type: Number },
  discPercentage: { type: Number }, // Discount Percentage
  overallDiscount: {
    percentage: { type: Number }, // Overall Discount Percentage
    amount: { type: Number }, // Overall Discount Amount in Rs
  },
  quotationFormat: {
    type: String,
    enum: ["gstWithoutRate", "gstWithRate","gst"], // Quotation format options
    default: "gstWithoutRate",
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type:String, enum:["pending","approved","rejected","expired"],default:"pending"}
 },
 { timestamps: true }
);

const Quotation = mongoose.model<IQuotation>("Quotation", quotationSchema);

export default Quotation;
