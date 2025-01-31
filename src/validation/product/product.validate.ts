import { z } from "zod";
import { commonValidators } from "../../middleware/Validation/validation";

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    company: commonValidators.id("Invalid compnayId"),
    sukCode: z.string().min(1, "SKU code is required"),
    hsn: z.string().min(1, "HSN code is required"),
    description: z.string().min(1, "Description is required"),

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
      .min(1, "MRP is required a valid number"),
    saleRate: z.coerce
      .number()
      .finite("MRP must be a valid number")
      .min(1, "saleRate is required a valid number")
      .optional(),
    excubleGST: z.coerce
      .number()
      .min(1, "excubleGST is required a valid number")
      .optional(),
  }),
});

export type ProductInpute = z.infer<typeof productSchema>;
