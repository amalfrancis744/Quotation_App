"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationSchema = void 0;
var zod_1 = require("zod");
// Custom error messages
var errorMessages = {
    whitespace: "Field cannot contain only whitespace",
    required: "This field is required",
    invalid: "Invalid value provided",
};
// Helper function to check if string contains only whitespace
var containsOnlyWhitespace = function (str) { return str.trim().length === 0; };
// Define the item schema for the items array
var quotationItemSchema = zod_1.z.object({
    product: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.coerce
        .number()
        .positive("Quantity must be greater than 0")
        .finite("Quantity must be a valid number"),
    price: zod_1.z.coerce
        .number()
        .positive("Price must be greater than 0")
        .finite("Price must be a valid number"),
});
exports.quotationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        contractor: zod_1.z
            .string()
            .min(1, "Customer/Contractor ID is required")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace,
        }),
        items: zod_1.z
            .array(quotationItemSchema)
            .min(1, "At least one item is required")
            .max(100, "Cannot exceed 100 items"),
        jNo: zod_1.z
            .string()
            .min(1, "JNo number is required")
            .max(50, "JNo number cannot exceed 50 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace,
        }),
        party: zod_1.z
            .string()
            .min(1, "Party name is required")
            .max(200, "Party name cannot exceed 200 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace,
        }),
        email: zod_1.z
            .string()
            .email("Invalid email format")
            .max(100, "Email cannot exceed 100 characters")
            .optional(),
        billQty: zod_1.z.coerce
            .number()
            .int("Bill quantity must be a whole number")
            .positive("Bill quantity must be greater than 0")
            .default(1),
        salesMan: zod_1.z
            .string()
            .min(1, "Salesman name is required")
            .max(100, "Salesman name cannot exceed 100 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace,
        }),
        discPercentage: zod_1.z.coerce
            .number()
            .min(0, "Discount percentage cannot be negative")
            .max(100, "Discount percentage cannot exceed 100")
            .optional(),
        netAmount: zod_1.z.coerce
            .number()
            .positive("Net amount must be greater than 0")
            .finite("Net amount must be a valid number"),
        grossAmount: zod_1.z.coerce
            .number()
            .positive("Gross amount must be greater than 0")
            .finite("Gross amount must be a valid number"),
        overallDiscount: zod_1.z.coerce
            .number()
            .min(0, "Overall discount cannot be negative")
            .finite("Overall discount must be a valid number")
            .optional(),
        totalAmount: zod_1.z.coerce
            .number()
            .positive("Total amount must be greater than 0")
            .finite("Total amount must be a valid number"),
        quotationFormat: zod_1.z
            .string()
            .min(1, "Quotation format is required")
            .max(50, "Quotation format cannot exceed 50 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace,
        }).optional(),
    })
    // .refine(
    //   (data) => {
    //     // Validate that gross amount is less than net amount
    //     if (data.grossAmount > data.netAmount) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Gross amount cannot be greater than net amount",
    //     path: ["grossAmount"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     // Validate that total amount matches items calculation
    //     const calculatedTotal = data.items.reduce(
    //       (sum, item) => sum + item.quantity * item.price,
    //       0
    //     );
    //     return Math.abs(calculatedTotal - data.totalAmount) < 0.01; // Using small epsilon for floating-point comparison
    //   },
    //   {
    //     message: "Total amount does not match items calculation",
    //     path: ["totalAmount"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     // If both discount percentage and overall discount are provided, throw error
    //     if (data.discPercentage !== undefined && data.overallDiscount !== undefined) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Cannot provide both discount percentage and overall discount",
    //     path: ["discPercentage"],
    //   }
    // ),
});
