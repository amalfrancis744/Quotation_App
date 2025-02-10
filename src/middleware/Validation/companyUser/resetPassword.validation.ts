import { z } from "zod";

const errorMessages = {
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

const containsUppercase = (str: string) => /[A-Z]/.test(str);
const containsLowercase = (str: string) => /[a-z]/.test(str);
const containsNumber = (str: string) => /\d/.test(str);
const containsSpecialChar = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str);


export const resetPasswordCompanyUserSchema = z.object({
  body: z.object({
    newPassword: z.string()
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
         }),
  }),
});

export type CompanyInput = z.infer<typeof resetPasswordCompanyUserSchema>["body"];
