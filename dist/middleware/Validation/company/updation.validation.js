"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationCompanySchema = void 0;
var zod_1 = require("zod");
exports.updateValidationCompanySchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string()
            .optional()
            .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
            .refine(function (str) { return !str || str.length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return !str || !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str); }, {
            message: "Company name can only contain letters, numbers, and basic punctuation"
        }),
        alias: zod_1.z.string()
            .optional()
            .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
            .refine(function (str) { return !str || str.length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return !str || /^[a-zA-Z0-9-]+$/.test(str); }, {
            message: "Alias can only contain letters, numbers, and hyphens"
        }),
        mobileNo: zod_1.z.string()
            .optional()
            .refine(function (str) { return !str || /^\d{10}$/.test(str); }, {
            message: "Mobile number must be 10 digits"
        }),
        state: zod_1.z.string()
            .optional()
            .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
            .refine(function (str) { return !str || str.length >= 2; }, {
            message: "Field must be at least 2 characters long"
        })
            .refine(function (str) { return !str || !/\d/.test(str); }, {
            message: "State name cannot contain numbers"
        }),
        email: zod_1.z.string()
            .optional()
            .transform(function (str) { var _a; return (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase(); })
            .refine(function (str) { return !str || zod_1.z.string().email().safeParse(str).success; }, {
            message: "Invalid email format"
        }),
        addresses: zod_1.z.array(zod_1.z.object({
            address: zod_1.z.string()
                .optional()
                .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
                .refine(function (str) { return !str || str.length >= 2; }, {
                message: "Field must be at least 2 characters long"
            }),
            city: zod_1.z.string()
                .optional()
                .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
                .refine(function (str) { return !str || str.length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !str || !/\d/.test(str); }, {
                message: "City name cannot contain numbers"
            }),
            pincode: zod_1.z.string()
                .optional()
                .refine(function (str) { return !str || /^\d{6}$/.test(str); }, {
                message: "Pincode must be 6 digits"
            }),
            district: zod_1.z.string()
                .optional()
                .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
                .refine(function (str) { return !str || str.length >= 2; }, {
                message: "Field must be at least 2 characters long"
            }),
            state: zod_1.z.string()
                .optional()
                .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
                .refine(function (str) { return !str || str.length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !str || !/\d/.test(str); }, {
                message: "State name cannot contain numbers"
            }),
            isActive: zod_1.z.boolean().optional()
        }))
            .optional()
            .default([]),
        accountDetails: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string()
                .optional()
                .transform(function (str) { return str === null || str === void 0 ? void 0 : str.trim(); })
                .refine(function (str) { return !str || str.length >= 2; }, {
                message: "Field must be at least 2 characters long"
            })
                .refine(function (str) { return !str || !/^\d+$/.test(str); }, {
                message: "Name cannot be purely numeric"
            }),
            accType: zod_1.z.enum(["Primary", "Secondary"]).optional(),
            mobileNo: zod_1.z.string()
                .optional()
                .refine(function (str) { return !str || /^\+1-\d{3}-\d{4}$/.test(str); }, {
                message: "Mobile number must be in format: +1-XXX-XXXX"
            }),
            email: zod_1.z.string()
                .optional()
                .transform(function (str) { var _a; return (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase(); })
                .refine(function (str) { return !str || zod_1.z.string().email().safeParse(str).success; }, {
                message: "Invalid email format"
            })
        }))
            .optional()
            .default([]),
        website: zod_1.z.string()
            .optional()
            .transform(function (str) { var _a; return (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase(); })
            .refine(function (str) { return !str || /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(str); }, {
            message: "Website must be in format: www.domain.com"
        })
    })
});
