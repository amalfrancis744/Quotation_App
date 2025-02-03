import { z } from "zod";

// Custom error messages
const errorMessages = {
  whitespace: "Field cannot contain only whitespace",
  specialChars: "Field cannot contain special characters except - and _",
  numeric: "Field cannot be purely numeric",
};

// Helper function to check if string contains only whitespace
const containsOnlyWhitespace = (str: string) => str.trim().length === 0;

// Helper function to check if string contains only numbers
const containsOnlyNumbers = (str: string) => /^\d+$/.test(str);

// Helper function to check for invalid special characters
const containsInvalidSpecialChars = (str: string) => /[^a-zA-Z0-9\s\-_]/.test(str);

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string()
      .max(100, "Product name cannot exceed 100 characters")
      .refine(str => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine(str => !containsOnlyNumbers(str), {
        message: "Product name cannot be purely numeric"
      })
      .refine(str => !containsInvalidSpecialChars(str), {
        message: "Product name can only contain letters, numbers, spaces, hyphens, and underscores"
      })
      .optional(),

    category: z.string()
      .max(100, "Category cannot exceed 100 characters")
      .refine(str => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .optional(),

    sukCode: z.string()
      .max(50, "SKU code cannot exceed 50 characters")
      .refine(str => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .optional(),

    hsn: z.string()
      .max(50, "HSN code cannot exceed 50 characters")
      .refine(str => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .refine(str => /^\d+$/.test(str), {
        message: "HSN code must contain only numbers"
      })
      .optional(),

    description: z.string()
      .max(500, "Description cannot exceed 500 characters")
      .refine(str => !containsOnlyWhitespace(str), {
        message: errorMessages.whitespace
      })
      .optional(),

    gstPercentage: z.coerce
      .number()
      .min(0, "GST percentage must be at least 0")
      .max(100, "GST percentage cannot exceed 100")
      .optional(),

    discountPercentage: z.coerce
      .number()
      .min(0, "Discount percentage must be at least 0")
      .max(100, "Discount percentage cannot exceed 100")
      .optional(),

    mrp: z.coerce
      .number()
      .finite("MRP must be a valid number")
      .min(0.01, "MRP must be greater than 0")
      .refine((val) => !isNaN(val), {
        message: "MRP must be a valid number"
      })
      .optional(),

    saleRate: z.coerce
      .number()
      .finite("Sale rate must be a valid number")
      .min(0.01, "Sale rate must be greater than 0")
      .refine((val) => !isNaN(val), {
        message: "Sale rate must be a valid number"
      })
      .optional(),

    excubleGST: z.coerce
      .number()
      .min(0.01, "Excludable GST must be greater than 0")
      .refine((val) => !isNaN(val), {
        message: "Excludable GST must be a valid number"
      })
      .optional(),
  }),
});

export type ProductInput = z.infer<typeof updateProductSchema>;