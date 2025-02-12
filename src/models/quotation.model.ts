import mongoose, { Schema } from "mongoose";
import { IQuotation } from "../interfaces/quotation.interface";

const QuotationItemSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Transform for QuotationItem
QuotationItemSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const quotationSchema: Schema<IQuotation> = new Schema(
  {
    contractor: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    items: [QuotationItemSchema],
    totalAmount: { type: Number, required: true },
    jNo: { type: String, unique: true },
    party: { type: String },
    email: { type: String },
    billQty: { type: Number },
    salesMan: { type: String },
    grossAmount: { type: Number },
    netAmount: { type: Number },
    discPercentage: { type: Number },
    overallDiscount: {
      percentage: { type: Number },
      amount: { type: Number },
    },
    quotationFormat: {
      type: String,
      enum: ["gstWithoutRate", "gstWithRate", "gst"],
      default: "gstWithoutRate",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "expired"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Transform for main schema
quotationSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Quotation = mongoose.model<IQuotation>("Quotation", quotationSchema);

export default Quotation;
