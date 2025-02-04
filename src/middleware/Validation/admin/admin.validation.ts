import { z } from 'zod';

const errorMessages = {
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
const containsOnlyWhitespace = (str: string) => str.trim().length === 0;
const containsOnlyNumbers = (str: string) => /^\d+$/.test(str);
const containsInvalidSpecialChars = (str: string) => /[^a-zA-Z0-9\s\-_]/.test(str);
const containsUppercase = (str: string) => /[A-Z]/.test(str);
const containsLowercase = (str: string) => /[a-z]/.test(str);
const containsNumber = (str: string) => /\d/.test(str);
const containsSpecialChar = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

export const adminRegisterSchema = z.object({
  body: z.object({
    username: z.string()
      .min(1, errorMessages.required.name)
      .max(100, errorMessages.length.name)
      .refine((str) => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine((str) => !containsOnlyNumbers(str), {
        message: errorMessages.numeric
      })
      .refine((str) => !containsInvalidSpecialChars(str), {
        message: "Name can only contain letters, numbers, spaces, hyphens, and underscores"
      }),
    
    password: z.string()
      .min(1, errorMessages.required.password)
      .min(8, errorMessages.length.passwordMin)
      .max(100, errorMessages.length.passwordMax)
      .refine((str) => containsUppercase(str), {
        message: errorMessages.password.uppercase
      })
      .refine((str) => containsLowercase(str), {
        message: errorMessages.password.lowercase
      })
      .refine((str) => containsNumber(str), {
        message: errorMessages.password.number
      })
      .refine((str) => containsSpecialChar(str), {
        message: errorMessages.password.specialChar
      })
  })
});

export type CustomerInput = z.infer<typeof adminRegisterSchema>;