import { z } from 'zod';

const errorMessages = {
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
const containsOnlyWhitespace = (str: string) => str.trim().length === 0;
const containsOnlyNumbers = (str: string) => /^\d+$/.test(str);
const containsInvalidSpecialChars = (str: string) => /[^a-zA-Z0-9\s\-_]/.test(str);

export const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string()
      .max(100, errorMessages.length.name)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine((str) => !containsOnlyNumbers(str), {
        message: errorMessages.numeric
      })
      .refine((str) => !containsInvalidSpecialChars(str), {
        message: "Name can only contain letters, numbers, spaces, hyphens, and underscores"
      })
      .optional(),

    email: z.string()
      .max(100, errorMessages.length.email)
      .email(errorMessages.format.email)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .optional(),

    mobileNo: z.string()
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine((str) => /^\d+$/.test(str), {
        message: errorMessages.format.mobile
      })
      .refine((str) => str.length === 10, {
        message: errorMessages.length.mobile
      })
      .optional(),
  })
});

export type CustomerInput = z.infer<typeof updateCustomerSchema>;