"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCompanySchema = void 0;
var zod_1 = require("zod");
exports.validateCompanySchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string()
            .min(1, "Company name is required")
            .max(100)
            .refine(function (str) { return str.trim().length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str); }, {
            message: "Company name can only contain letters, numbers, and basic punctuation"
        })
            .transform(function (str) { return str.trim(); }),
        alias: zod_1.z.string()
            .min(1, "Company alias is required")
            .max(50)
            .refine(function (str) { return str.trim().length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return /^[a-zA-Z0-9-]+$/.test(str); }, {
            message: "Alias can only contain letters, numbers, and hyphens"
        })
            .transform(function (str) { return str.trim(); }),
        mobileNo: zod_1.z.string()
            .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
        state: zod_1.z.string()
            .min(1, "State is required")
            .refine(function (str) { return str.trim().length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return !/\d/.test(str); }, {
            message: "State name cannot contain numbers"
        })
            .transform(function (str) { return str.trim(); }),
        email: zod_1.z.string()
            .email("Invalid email format")
            .refine(function (str) { return str.trim().length > 0; }, {
            message: "Field cannot contain only whitespace"
        })
            .transform(function (str) { return str.trim().toLowerCase(); }),
        addresses: zod_1.z.array(zod_1.z.object({
            address: zod_1.z.string()
                .min(1, "Address is required")
                .refine(function (str) { return str.trim().length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .transform(function (str) { return str.trim(); }),
            city: zod_1.z.string()
                .min(1, "City is required")
                .refine(function (str) { return str.trim().length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !/\d/.test(str); }, {
                message: "City name cannot contain numbers"
            })
                .transform(function (str) { return str.trim(); }),
            pincode: zod_1.z.string()
                .regex(/^\d{6}$/, "Pincode must be 6 digits"),
            district: zod_1.z.string()
                .min(1, "District is required")
                .refine(function (str) { return str.trim().length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .transform(function (str) { return str.trim(); }),
            state: zod_1.z.string()
                .min(1, "State is required")
                .refine(function (str) { return str.trim().length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !/\d/.test(str); }, {
                message: "State name cannot contain numbers"
            })
                .transform(function (str) { return str.trim(); }),
            isActive: zod_1.z.boolean()
        }))
            .optional()
            .default([])
            .refine(function (addresses) { return !addresses || addresses.length === 0 || addresses.every(function (addr) { return addr !== undefined; }); }, { message: "If addresses are provided, they must be valid" }),
        accountDetails: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string()
                .min(1, "Account holder name is required")
                .refine(function (str) { return str.trim().length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !/^\d+$/.test(str); }, {
                message: "Name cannot be purely numeric"
            })
                .transform(function (str) { return str.trim(); }),
            accType: zod_1.z.enum(["Primary", "Secondary"]),
            mobileNo: zod_1.z.string()
                .regex(/^\+1-\d{3}-\d{4}$/, "Mobile number must be in format: +1-XXX-XXXX"),
            email: zod_1.z.string()
                .email("Invalid email format")
                .refine(function (str) { return str.trim().length > 0; }, {
                message: "Field cannot contain only whitespace"
            })
                .transform(function (str) { return str.trim().toLowerCase(); })
        }))
            .optional()
            .default([])
            .refine(function (accounts) { return !accounts || accounts.length === 0 || accounts.every(function (acc) { return acc !== undefined; }); }, { message: "If account details are provided, they must be valid" }),
        website: zod_1.z.string()
            .regex(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "Website must be in format: www.domain.com")
            .optional()
            .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim().toLowerCase(); })
    })
});
