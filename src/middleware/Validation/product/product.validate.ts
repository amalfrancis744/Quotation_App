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
const containsInvalidSpecialChars = (str: string) =>
  /[^a-zA-Z0-9\s\-_]/.test(str);

export const productSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Product name is required")
        .max(100, "Product name cannot exceed 100 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        })
        .refine((str) => !containsOnlyNumbers(str), {
          message: "Product name cannot be purely numeric",
        })
        .refine((str) => !containsInvalidSpecialChars(str), {
          message:
            "Product name can only contain letters, numbers, spaces, hyphens, and underscores",
        }),

      category: z
        .string()
        .min(1, "Category is required")
        .max(100, "Category cannot exceed 100 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      sukCode: z
        .string()
        .min(1, "SKU code is required")
        .max(50, "SKU code cannot exceed 50 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      hsn: z
        .string()
        .min(1, "HSN code is required")
        .max(50, "HSN code cannot exceed 50 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        })
        .refine((str) => /^\d+$/.test(str), {
          message: "HSN code must contain only numbers",
        }),

      description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description cannot exceed 500 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

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
          message: "MRP must be a valid number",
        }),

      saleRate: z.coerce
        .number()
        .finite("Sale rate must be a valid number")
        .min(0.01, "Sale rate must be greater than 0")
        .refine((val) => !isNaN(val), {
          message: "Sale rate must be a valid number",
        })
        .optional(),

      excubleGST: z.coerce
        .number()
        .min(0.01, "Excludable GST must be greater than 0")
        .refine((val) => !isNaN(val), {
          message: "Excludable GST must be a valid number",
        })
        .optional(),
    })
    .refine(
      (data) => {
        // If saleRate is provided, it must not be greater than MRP
        if (data.saleRate !== undefined && data.saleRate > data.mrp) {
          return false;
        }
        return true;
      },
      {
        message: "Sale rate cannot be greater than MRP",
        path: ["saleRate"], // This will make the error appear on the saleRate field
      }
    ),
});

export type ProductInput = z.infer<typeof productSchema>;
