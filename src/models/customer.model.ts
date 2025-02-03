import mongoose, { Schema } from "mongoose";
import { Icustomer } from "../interfaces/customer.interface";

const customerSchema: Schema<Icustomer> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
}, {
    timestamps: true
});

const Customer = mongoose.model<Icustomer>('Customer', customerSchema);

export default Customer;