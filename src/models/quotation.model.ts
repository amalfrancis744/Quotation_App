const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
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
  date: { type: Date, default: Date.now },
  jNo: { type: String },
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
    enum: ["gstWithoutRate", "gstWithRate"], // Quotation format options
    default: "gstWithoutRate",
  },
});

module.exports = mongoose.model("Quotation", quotationSchema);
