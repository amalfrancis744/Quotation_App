"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordCompanyUserSchema = void 0;
var zod_1 = require("zod");
var errorMessages = {
    required: {
        password: "Password is required"
    },
    length: {
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
var containsUppercase = function (str) { return /[A-Z]/.test(str); };
var containsLowercase = function (str) { return /[a-z]/.test(str); };
var containsNumber = function (str) { return /\d/.test(str); };
var containsSpecialChar = function (str) { return /[!@#$%^&*(),.?":{}|<>]/.test(str); };
exports.resetPasswordCompanyUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z.string()
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
        }),
    }),
});
