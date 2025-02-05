"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSchema = void 0;
var zod_1 = require("zod");
var errorMessages = {
    whitespace: "Field cannot contain only whitespace",
    specialChars: "Field cannot contain special characters except - and _",
    numeric: "Field cannot be purely numeric",
    length: {
        name: "Name cannot exceed 100 characters",
        email: "Email cannot exceed 100 characters",
        mobile: "Mobile number must be 10 digits"
    },
    format: {
        email: "Invalid email format",
        mobile: "Mobile number must contain only digits"
    }
};
// Helper functions
var containsOnlyWhitespace = function (str) { return str.trim().length === 0; };
var containsOnlyNumbers = function (str) { return /^\d+$/.test(str); };
var containsInvalidSpecialChars = function (str) { return /[^a-zA-Z0-9\s\-_]/.test(str); };
exports.updateCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string()
            .max(100, errorMessages.length.name)
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .refine(function (str) { return !containsOnlyNumbers(str); }, {
            message: errorMessages.numeric
        })
            .refine(function (str) { return !containsInvalidSpecialChars(str); }, {
            message: "Name can only contain letters, numbers, spaces, hyphens, and underscores"
        })
            .optional(),
        email: zod_1.z.string()
            .max(100, errorMessages.length.email)
            .email(errorMessages.format.email)
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .optional(),
        mobileNo: zod_1.z.string()
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .refine(function (str) { return /^\d+$/.test(str); }, {
            message: errorMessages.format.mobile
        })
            .refine(function (str) { return str.length === 10; }, {
            message: errorMessages.length.mobile
        })
            .optional(),
    })
});
