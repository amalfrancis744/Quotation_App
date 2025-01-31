import express from "express";
import * as UserProductController from "../../controllers/CompanyUser/userProducts";
import { uploadS3 } from "../../middleware/FileUpload/fileUpload";
import { validateRequest } from "../../middleware/Validation/validation";
import { productSchema } from "../../validation/product/product.validate";

const router = express.Router();

router.post("/create", uploadS3.single('productImage'),validateRequest(productSchema), UserProductController.createProduct);
router.get("/company-products",UserProductController.getCompanyProducts)

export default router
