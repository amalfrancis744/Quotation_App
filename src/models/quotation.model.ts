const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },

  // Additional Fields
  date: { type: Date, default: Date.now }, // Date of quotation creation
  jNo: { type: String }, // J.No (Job Number)
  party: { type: String }, // Party name
  email: { type: String }, // Email of the party
  contractor: { type: String }, // Contractor name
  billQty: { type: Number }, // Bill Quantity
  salesMan: { type: String }, // Salesman name
  grossAmount: { type: Number }, // Gross Amount
  netAmount: { type: Number }, // Net Amount
  discPercentage: { type: Number }, // Discount Percentage
  overallDiscount: {
    percentage: { type: Number }, // Overall Discount Percentage
    amount: { type: Number }, // Overall Discount Amount in Rs
  },
  quotationFormat: {
    type: String,
    enum: ['gstWithoutRate', 'gstWithRate'], // Quotation format options
    default: 'gstWithoutRate',
  },
});

module.exports = mongoose.model('Quotation', quotationSchema);