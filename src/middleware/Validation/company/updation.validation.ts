import { z } from 'zod';

export const updateValidationCompanySchema = z.object({
  body: z.object({
    companyName: z.string()
      .optional()
      .transform(str => str?.trim())
      .refine(str => !str || str.length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => !str || !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str), {
        message: "Company name can only contain letters, numbers, and basic punctuation"
      }),

    alias: z.string()
      .optional()
      .transform(str => str?.trim())
      .refine(str => !str || str.length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => !str || /^[a-zA-Z0-9-]+$/.test(str), {
        message: "Alias can only contain letters, numbers, and hyphens"
      }),

    mobileNo: z.string()
      .optional()
      .refine(str => !str || /^\d{10}$/.test(str), {
        message: "Mobile number must be 10 digits"
      }),

    state: z.string()
      .optional()
      .transform(str => str?.trim())
      .refine(str => !str || str.length >= 2, {
        message: "Field must be at least 2 characters long"
      })
      .refine(str => !str || !/\d/.test(str), {
        message: "State name cannot contain numbers"
      }),

    email: z.string()
      .optional()
      .transform(str => str?.trim()?.toLowerCase())
      .refine(str => !str || z.string().email().safeParse(str).success, {
        message: "Invalid email format"
      }),

    addresses: z.array(z.object({
      address: z.string()
        .optional()
        .transform(str => str?.trim())
        .refine(str => !str || str.length >= 2, {
          message: "Field must be at least 2 characters long"
        }),

      city: z.string()
        .optional()
        .transform(str => str?.trim())
        .refine(str => !str || str.length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !str || !/\d/.test(str), {
          message: "City name cannot contain numbers"
        }),

      pincode: z.string()
        .optional()
        .refine(str => !str || /^\d{6}$/.test(str), {
          message: "Pincode must be 6 digits"
        }),

      district: z.string()
        .optional()
        .transform(str => str?.trim())
        .refine(str => !str || str.length >= 2, {
          message: "Field must be at least 2 characters long"
        }),

      state: z.string()
        .optional()
        .transform(str => str?.trim())
        .refine(str => !str || str.length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !str || !/\d/.test(str), {
          message: "State name cannot contain numbers"
        }),

      isActive: z.boolean().optional()
    }))
    .optional()
    .default([]),

    accountDetails: z.array(z.object({
      name: z.string()
        .optional()
        .transform(str => str?.trim())
        .refine(str => !str || str.length >= 2, {
          message: "Field must be at least 2 characters long"
        })
        .refine(str => !str || !/^\d+$/.test(str), {
          message: "Name cannot be purely numeric"
        }),

      accType: z.enum(["Primary", "Secondary"]).optional(),

      mobileNo: z.string()
        .optional()
        .refine(str => !str || /^\+1-\d{3}-\d{4}$/.test(str), {
          message: "Mobile number must be in format: +1-XXX-XXXX"
        }),

      email: z.string()
        .optional()
        .transform(str => str?.trim()?.toLowerCase())
        .refine(str => !str || z.string().email().safeParse(str).success, {
          message: "Invalid email format"
        })
    }))
    .optional()
    .default([]),

    website: z.string()
      .optional()
      .transform(str => str?.trim()?.toLowerCase())
      .refine(str => !str || /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(str), {
        message: "Website must be in format: www.domain.com"
      })
  })
});

export type CompanyInput = z.infer<typeof updateValidationCompanySchema>["body"];