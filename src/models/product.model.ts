import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interfaces"; // calling the product interface

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true }, // Product name
    category: { type: String, required: true }, // Product category
    productImage: {
      key: { type: String, required: true }, // S3 object key
      imageUrl: { type: String, required: true }, // S3 URL
      originalname: { type: String }, // Original filename
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, // Company name
    sukCode: { type: String, required: true, unique: true }, // Unique product code
    hsn: { type: String, required: true }, // HSN code
    description: { type: String, required: true }, // Product description
    gstPercentage: { type: Number }, // GST rate
    discountPercentage: { type: Number }, // Discount rate
    mrp: { type: Number, required: true }, // Maximum Retail Price
    saleRate: { type: Number },
    excubleGST: { type: Number }, // Excuble GST percentage,
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
