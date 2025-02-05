"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegisterSchema = void 0;
var zod_1 = require("zod");
var errorMessages = {
    whitespace: "Field cannot contain only whitespace",
    specialChars: "Field cannot contain special characters except - and _",
    numeric: "Field cannot be purely numeric",
    required: {
        name: "Name is required",
        password: "Password is required"
    },
    length: {
        name: "Name cannot exceed 100 characters",
        passwordMin: "Password must be at least 8 characters long",
        passwordMax: "Password cannot exceed 100 characters"
    },
    password: {
        uppercase: "Password must contain at least one uppercase letter",
        lowercase: "Password must contain at least one lowercase letter",
        number: "Password must contain at least one number",
        specialChar: "Password must contain at least one special character"
    }
};
// Helper functions
var containsOnlyWhitespace = function (str) { return str.trim().length === 0; };
var containsOnlyNumbers = function (str) { return /^\d+$/.test(str); };
var containsInvalidSpecialChars = function (str) { return /[^a-zA-Z0-9\s\-_]/.test(str); };
var containsUppercase = function (str) { return /[A-Z]/.test(str); };
var containsLowercase = function (str) { return /[a-z]/.test(str); };
var containsNumber = function (str) { return /\d/.test(str); };
var containsSpecialChar = function (str) { return /[!@#$%^&*(),.?":{}|<>]/.test(str); };
exports.adminRegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string()
            .min(1, errorMessages.required.name)
            .max(100, errorMessages.length.name)
            .refine(function (str) { return !containsOnlyWhitespace(str); }, {
            message: errorMessages.whitespace
        })
            .refine(function (str) { return !containsOnlyNumbers(str); }, {
            message: errorMessages.numeric
        })
            .refine(function (str) { return !containsInvalidSpecialChars(str); }, {
            message: "Name can only contain letters, numbers, spaces, hyphens, and underscores"
        }),
        password: zod_1.z.string()
            .min(1, errorMessages.required.password)
            .min(8, errorMessages.length.passwordMin)
            .max(100, errorMessages.length.passwordMax)
            .refine(function (str) { return containsUppercase(str); }, {
            message: errorMessages.password.uppercase
        })
            .refine(function (str) { return containsLowercase(str); }, {
            message: errorMessages.password.lowercase
        })
            .refine(function (str) { return containsNumber(str); }, {
            message: errorMessages.password.number
        })
            .refine(function (str) { return containsSpecialChar(str); }, {
            message: errorMessages.password.specialChar
        })
    })
});
