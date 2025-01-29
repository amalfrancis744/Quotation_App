import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  category:{type:String,required:true},  // Product  category
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  }, // Company name
  sukCode: { type: String, required: true, unique: true }, // Unique product code
  hsn: { type: String, required: true }, // HSN code
  description: { type: String, required: true }, // Product description
  gstPercentage: { type: Number },  // GST rate
  discountPercentage: { type: Number }, // Discount rate
  mrp:{type:Number,required:true}, // Maximum Retail Price
  
  saleRate: { type: Number },
  excubleGST:{type:Number}, // Excuble GST percentage

},{timestamps:true});
