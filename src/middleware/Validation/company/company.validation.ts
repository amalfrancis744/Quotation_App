import { z } from 'zod';

export const validateCompanySchema = z.object({
  body: z.object({
    companyName: z.string()
      .min(1, "Company name is required")
      .max(100)
      .refine(str => str.trim().length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str), {
        message: "Company name can only contain letters, numbers, and basic punctuation"
      })
      .transform(str => str.trim()),

    alias: z.string()
      .min(1, "Company alias is required")
      .max(50)
      .refine(str => str.trim().length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => /^[a-zA-Z0-9-]+$/.test(str), {
        message: "Alias can only contain letters, numbers, and hyphens"
      })
      .transform(str => str.trim()),

      mobileNo: z.string()
      .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    state: z.string()
      .min(1, "State is required")
      .refine(str => str.trim().length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => !/\d/.test(str), {
        message: "State name cannot contain numbers"
      })
      .transform(str => str.trim()),

    email: z.string()
      .email("Invalid email format")
      .refine(str => str.trim().length > 0, {
        message: "Field cannot contain only whitespace"
      })
      .transform(str => str.trim().toLowerCase()),

    addresses: z.array(z.object({
      address: z.string()
        .min(1, "Address is required")
        .refine(str => str.trim().length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .transform(str => str.trim()),

      city: z.string()
        .min(1, "City is required")
        .refine(str => str.trim().length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !/\d/.test(str), {
          message: "City name cannot contain numbers"
        })
        .transform(str => str.trim()),

      pincode: z.string()
        .regex(/^\d{6}$/, "Pincode must be 6 digits"),

      district: z.string()
        .min(1, "District is required")
        .refine(str => str.trim().length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .transform(str => str.trim()),

      state: z.string()
        .min(1, "State is required")
        .refine(str => str.trim().length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !/\d/.test(str), {
          message: "State name cannot contain numbers"
        })
        .transform(str => str.trim()),

      isActive: z.boolean()
    }))
    .optional()
    .default([])
    .refine(
      (addresses) => !addresses || addresses.length === 0 || addresses.every(addr => addr !== undefined),
      { message: "If addresses are provided, they must be valid" }
    ),

    accountDetails: z.array(z.object({
      name: z.string()
        .min(1, "Account holder name is required")
        .refine(str => str.trim().length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !/^\d+$/.test(str), {
          message: "Name cannot be purely numeric"
        })
        .transform(str => str.trim()),

      accType: z.enum(["Primary", "Secondary"]),

      mobileNo: z.string()
        .regex(/^\+1-\d{3}-\d{4}$/, "Mobile number must be in format: +1-XXX-XXXX"),

      email: z.string()
        .email("Invalid email format")
        .refine(str => str.trim().length > 0, {
          message: "Field cannot contain only whitespace"
        })
        .transform(str => str.trim().toLowerCase())
    }))
    .optional()
    .default([])
    .refine(
      (accounts) => !accounts || accounts.length === 0 || accounts.every(acc => acc !== undefined),
      { message: "If account details are provided, they must be valid" }
    ),

    website: z.string()
      .regex(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, "Website must be in format: www.domain.com")
      .optional()
      .transform(str => str?.trim().toLowerCase())
  })
});

export type CompanyInput = z.infer<typeof validateCompanySchema>["body"];