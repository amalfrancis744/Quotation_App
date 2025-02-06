import { Types } from 'mongoose';

// Interface for quotation items
interface QuotationItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  amount?: number; // Optional calculated field
  _id?: Types.ObjectId;
}

// Main Quotation interface
export interface IQuotation {
  // Reference fields
  company: Types.ObjectId;
  contractor: Types.ObjectId; // customer reference

  // Basic quotation details
  jNo: string; // Job/Quotation number
  party: string;
  email?: string;
  billQty: number;
  salesMan: string;
  quotationFormat: string;
  status:string;
  // Items
  items: QuotationItem[];

  // Financial details
  netAmount: number;
  grossAmount: number;
  totalAmount: number;

  // Discount details
  discPercentage?: number;
  overallDiscount?: number;


  // Audit fields
  isDeleted: boolean;
  deletedBy:Types.ObjectId
  deletedAt?: Date;
  createdBy: Types.ObjectId;

  // Calculated or derived fields
  gstAmount?: number;
  discountAmount?: number;
  finalAmount?: number;
}

