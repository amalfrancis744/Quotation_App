import express from "express";
import * as UserProductController from "../../controllers/CompanyUser/userProducts";
import { uploadS3 } from "../../middleware/FileUpload/fileUpload";
import { validateRequest } from "../../middleware/Validation/validation";
import { productSchema } from "../../middleware/Validation/product/product.validate";
import { updateProductSchema } from "../../middleware/Validation/product/updateProduct.validate";

const router = express.Router();

router.post("/create", uploadS3.single('productImage'),validateRequest(productSchema), UserProductController.createProduct);
router.get("/company-products",UserProductController.getCompanyProducts)
router.get('/:product_id',UserProductController.getProduct)
router.put("/:product_id",uploadS3.single("productImage"),validateRequest(updateProductSchema),UserProductController.updateProduct)
router.delete("/:product_id",UserProductController.deleteProduct)

export default router
