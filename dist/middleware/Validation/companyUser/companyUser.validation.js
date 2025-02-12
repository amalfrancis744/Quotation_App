"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCompanyUserSchema = void 0;
var zod_1 = require("zod");
var errorMessages = {
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
var containsUppercase = function (str) { return /[A-Z]/.test(str); };
var containsLowercase = function (str) { return /[a-z]/.test(str); };
var containsNumber = function (str) { return /\d/.test(str); };
var containsSpecialChar = function (str) { return /[!@#$%^&*(),.?":{}|<>]/.test(str); };
exports.validateCompanyUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(1, "firstName is required")
            .max(100)
            .refine(function (str) { return str.trim().length >= 2; }, {
            message: "Field must be at least 2 characters long",
        })
            .refine(function (str) { return !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str); }, {
            message: "firstName can only contain letters, numbers, and basic punctuation",
        })
            .transform(function (str) { return str.trim(); }),
        lastName: zod_1.z
            .string()
            .min(1, "lastName is required")
            .max(100)
            .refine(function (str) { return str.trim().length >= 2; }, {
            message: "Field must be at least 2 characters long",
        })
            .refine(function (str) { return !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str); }, {
            message: "lastName can only contain letters, numbers, and basic punctuation",
        })
            .transform(function (str) { return str.trim(); }),
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
        }),
        email: zod_1.z
            .string()
            .email("Invalid email format")
            .refine(function (str) { return str.trim().length > 0; }, {
            message: "Field cannot contain only whitespace",
        })
            .transform(function (str) { return str.trim().toLowerCase(); }),
    }),
});
