"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = void 0;
var zod_1 = require("zod");
// Custom error messages
var errorMessages = {
    whitespace: "Field cannot contain only whitespace",
    specialChars: "Field cannot contain special characters except - and _",
    numeric: "Field cannot be purely numeric",
};
// Helper function to check if string contains only whitespace
var containsOnlyWhitespace = function (str) { return str.trim().length === 0; };
// Helper function to check if string contains only numbers
var containsOnlyNumbers = function (str) { return /^\d+$/.test(str); };
// Helper function to check for invalid special characters
var containsInvalidSpecialChars = function (str) { return /[^a-zA-Z0-9\s\-_]/.test(str); };
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string()
            .max(100, "Product name cannot exceed 100 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .refine(function (str) { return !containsOnlyNumbers(str); }, {
            message: "Product name cannot be purely numeric"
        })
            .refine(function (str) { return !containsInvalidSpecialChars(str); }, {
            message: "Product name can only contain letters, numbers, spaces, hyphens, and underscores"
        })
            .optional(),
        category: zod_1.z.string()
            .max(100, "Category cannot exceed 100 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .optional(),
        sukCode: zod_1.z.string()
            .max(50, "SKU code cannot exceed 50 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .optional(),
        hsn: zod_1.z.string()
            .max(50, "HSN code cannot exceed 50 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .refine(function (str) { return /^\d+$/.test(str); }, {
            message: "HSN code must contain only numbers"
        })
            .optional(),
        description: zod_1.z.string()
            .max(500, "Description cannot exceed 500 characters")
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .optional(),
        gstPercentage: zod_1.z.coerce
            .number()
            .min(0, "GST percentage must be at least 0")
            .max(100, "GST percentage cannot exceed 100")
            .optional(),
        discountPercentage: zod_1.z.coerce
            .number()
            .min(0, "Discount percentage must be at least 0")
            .max(100, "Discount percentage cannot exceed 100")
            .optional(),
        mrp: zod_1.z.coerce
            .number()
            .finite("MRP must be a valid number")
            .min(0.01, "MRP must be greater than 0")
            .refine(function (val) { return !isNaN(val); }, {
            message: "MRP must be a valid number"
        })
            .optional(),
        saleRate: zod_1.z.coerce
            .number()
            .finite("Sale rate must be a valid number")
            .min(0.01, "Sale rate must be greater than 0")
            .refine(function (val) { return !isNaN(val); }, {
            message: "Sale rate must be a valid number"
        })
            .optional(),
        excubleGST: zod_1.z.coerce
            .number()
            .min(0.01, "Excludable GST must be greater than 0")
            .refine(function (val) { return !isNaN(val); }, {
            message: "Excludable GST must be a valid number"
        })
            .optional(),
    }),
});
