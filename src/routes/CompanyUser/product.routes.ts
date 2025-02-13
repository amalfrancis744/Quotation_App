import express from "express";
import * as UserProductController from "../../controllers/CompanyUser/userProducts";
import {
  handleUploadError,
  uploadToS3,
} from "../../middleware/FileUpload/fileUpload";
import { validateRequest } from "../../middleware/Validation/validation";
import { productSchema } from "../../middleware/Validation/product/product.validate";
import { updateProductSchema } from "../../middleware/Validation/product/updateProduct.validate";
import { uploadMemory } from "../../middleware/Validation/formValidation";

const router = express.Router();

router.post(
  "/create",
  uploadMemory.single("productImage"), // Parse into memory
  handleUploadError, // Handle multer errors
  validateRequest(productSchema), // Validate body/fields
  uploadToS3, // Upload to S3 only if validation passes
  UserProductController.createProduct
);

router.get("/company-products", UserProductController.getCompanyProducts); // get all company products
router.get("/:product_id", UserProductController.getProduct); // get a specific product

router.put(
  "/:product_id",
  uploadMemory.single("productImage"),
  handleUploadError,
  validateRequest(updateProductSchema),
  uploadToS3,
  UserProductController.updateProduct
); //update a specific product with id

router.delete("/:product_id", UserProductController.deleteProduct); // delete a specific product with id

export default router;
