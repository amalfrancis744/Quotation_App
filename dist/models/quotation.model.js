"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var QuotationItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
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
var quotationSchema = new mongoose_1.Schema({
    contractor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Customer" },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Company" },
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
    deletedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "expired"],
        default: "pending",
    },
}, {
    timestamps: true,
});
// Transform for main schema
quotationSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
var Quotation = mongoose_1.default.model("Quotation", quotationSchema);
exports.default = Quotation;
