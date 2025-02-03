import { z } from 'zod';

const errorMessages = {
  whitespace: "Field cannot contain only whitespace",
  specialChars: "Field cannot contain special characters except - and _",
  numeric: "Field cannot be purely numeric",
  required: {
    name: "Name is required",
    email: "Email is required",
    mobile: "Mobile number is required"
  },
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
const containsOnlyWhitespace = (str: string) => str.trim().length === 0;
const containsOnlyNumbers = (str: string) => /^\d+$/.test(str);
const containsInvalidSpecialChars = (str: string) => /[^a-zA-Z0-9\s\-_]/.test(str);

export const customerSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, errorMessages.required.name)
      .max(100, errorMessages.length.name)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine((str) => !containsOnlyNumbers(str), {
        message: "Name cannot be purely numeric"
      })
      .refine((str) => !containsInvalidSpecialChars(str), {
        message: "Name can only contain letters, numbers, spaces, hyphens, and underscores"
      }),

    email: z.string()
      .min(1, errorMessages.required.email)
      .max(100, errorMessages.length.email)
      .email(errorMessages.format.email)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      }),

    mobileNo: z.string()
      .min(1, errorMessages.required.mobile)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine((str) => /^\d+$/.test(str), {
        message: errorMessages.format.mobile
      })
      .refine((str) => str.length === 10, {
        message: errorMessages.length.mobile
      }),
  })
});

export type CustomerInput = z.infer<typeof customerSchema>;