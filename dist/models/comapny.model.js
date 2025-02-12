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
exports.Company = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var AddressSchema = new mongoose_1.Schema({
    address: { type: String },
    city: { type: String },
    pincode: { type: String },
    district: { type: String },
    state: { type: String },
    isActive: { type: Boolean, default: false },
});
// Add a transform to rename `_id` to `id` for addresses
AddressSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id; // Rename `_id` to `id`
        delete ret._id; // Remove `_id`
    },
});
// Define the AccountDetails schema
var AccountDetailsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    accType: { type: String, required: true },
    mobileNo: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
});
// Add a transform to rename `_id` to `id` for accountDetails
AccountDetailsSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id; // Rename `_id` to `id`
        delete ret._id; // Remove `_id`
    },
});
// Define the Company schema
var CompanySchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    state: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    addresses: [AddressSchema], // Use the Address schema
    accountDetails: [AccountDetailsSchema], // Use the AccountDetails schema
    website: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
// Add a transform to rename `_id` to `id` for the Company schema
CompanySchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id; // Rename `_id` to `id`
        delete ret._id; // Remove `_id`
        delete ret.__v; // Remove version key (if not already disabled)
    },
});
exports.Company = mongoose_1.default.model("Company", CompanySchema);
