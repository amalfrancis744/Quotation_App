import { z } from "zod";

// Custom error messages
const errorMessages = {
  whitespace: "Field cannot contain only whitespace",
  required: "This field is required",
  invalid: "Invalid value provided",
};

// Helper function to check if string contains only whitespace
const containsOnlyWhitespace = (str: string) => str.trim().length === 0;

// Define the item schema for the items array
const quotationItemSchema = z.object({
  product: z.string().min(1, "Product ID is required"),
  quantity: z.coerce
    .number()
    .positive("Quantity must be greater than 0")
    .finite("Quantity must be a valid number"),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .finite("Price must be a valid number"),
});

export const quotationSchema = z.object({
  body: z
    .object({
      contractor: z
        .string()
        .min(1, "Customer/Contractor ID is required")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      items: z
        .array(quotationItemSchema)
        .min(1, "At least one item is required")
        .max(100, "Cannot exceed 100 items"),

      jNo: z
        .string()
        .min(1, "JNo number is required")
        .max(50, "JNo number cannot exceed 50 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      party: z
        .string()
        .min(1, "Party name is required")
        .max(200, "Party name cannot exceed 200 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      email: z
        .string()
        .email("Invalid email format")
        .max(100, "Email cannot exceed 100 characters")
        .optional(),

      billQty: z.coerce
        .number()
        .int("Bill quantity must be a whole number")
        .positive("Bill quantity must be greater than 0")
        .default(1),

      salesMan: z
        .string()
        .min(1, "Salesman name is required")
        .max(100, "Salesman name cannot exceed 100 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }),

      discPercentage: z.coerce
        .number()
        .min(0, "Discount percentage cannot be negative")
        .max(100, "Discount percentage cannot exceed 100")
        .optional(),

      netAmount: z.coerce
        .number()
        .positive("Net amount must be greater than 0")
        .finite("Net amount must be a valid number"),

      grossAmount: z.coerce
        .number()
        .positive("Gross amount must be greater than 0")
        .finite("Gross amount must be a valid number"),

      overallDiscount: z.coerce
        .number()
        .min(0, "Overall discount cannot be negative")
        .finite("Overall discount must be a valid number")
        .optional(),

      totalAmount: z.coerce
        .number()
        .positive("Total amount must be greater than 0")
        .finite("Total amount must be a valid number"),

      quotationFormat: z
        .string()
        .min(1, "Quotation format is required")
        .max(50, "Quotation format cannot exceed 50 characters")
        .refine((str) => !containsOnlyWhitespace(str), {
          message: errorMessages.whitespace,
        }).optional(),
    })
    // .refine(
    //   (data) => {
    //     // Validate that gross amount is less than net amount
    //     if (data.grossAmount > data.netAmount) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Gross amount cannot be greater than net amount",
    //     path: ["grossAmount"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     // Validate that total amount matches items calculation
    //     const calculatedTotal = data.items.reduce(
    //       (sum, item) => sum + item.quantity * item.price,
    //       0
    //     );
    //     return Math.abs(calculatedTotal - data.totalAmount) < 0.01; // Using small epsilon for floating-point comparison
    //   },
    //   {
    //     message: "Total amount does not match items calculation",
    //     path: ["totalAmount"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     // If both discount percentage and overall discount are provided, throw error
    //     if (data.discPercentage !== undefined && data.overallDiscount !== undefined) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Cannot provide both discount percentage and overall discount",
    //     path: ["discPercentage"],
    //   }
    // ),
});

export type QuotationInput = z.infer<typeof quotationSchema>;