import mongoose from "mongoose";

export interface IProduct {
    _id?: string;
    name: string;
    category: string;
    company: string | mongoose.Types.ObjectId;
    sukCode: string;
    hsn: string;
    description: string;
    gstPercentage?: number;
    discountPercentage?: number;
    mrp: number;
    saleRate?: number;
    excubleGST?: number;
    createdAt?: Date;
    updatedAt?: Date;
    productUrl?: string;
  }