import { z } from "zod";

const errorMessages = {

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

const containsUppercase = (str: string) => /[A-Z]/.test(str);
const containsLowercase = (str: string) => /[a-z]/.test(str);
const containsNumber = (str: string) => /\d/.test(str);
const containsSpecialChar = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str);


export const validateCompanyUserSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(1, "firstName is required")
      .max(100)
      .refine((str) => str.trim().length >= 2, {
        message: "Field must be at least 2 characters long",
      })
      .refine((str) => !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str), {
        message:
          "firstName can only contain letters, numbers, and basic punctuation",
      })
      .transform((str) => str.trim()),

      lastName: z
      .string()
      .min(1, "lastName is required")
      .max(100)
      .refine((str) => str.trim().length >= 2, {
        message: "Field must be at least 2 characters long",
      })
      .refine((str) => !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(str), {
        message:
          "lastName can only contain letters, numbers, and basic punctuation",
      })
      .transform((str) => str.trim()),

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
         }),

    email: z
      .string()
      .email("Invalid email format")
      .refine((str) => str.trim().length > 0, {
        message: "Field cannot contain only whitespace",
      })
      .transform((str) => str.trim().toLowerCase()),
  }),
});

export type CompanyInput = z.infer<typeof validateCompanyUserSchema>["body"];
