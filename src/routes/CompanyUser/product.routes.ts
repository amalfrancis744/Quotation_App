import express from "express";
import * as UserProductController from "../../controllers/CompanyUser/userProducts";
import { handleUploadError, uploadS3 } from "../../middleware/FileUpload/fileUpload";
import { validateRequest } from "../../middleware/Validation/validation";
import { productSchema } from "../../middleware/Validation/product/product.validate";
import { updateProductSchema } from "../../middleware/Validation/product/updateProduct.validate";

const router = express.Router();

router.post("/create", uploadS3.single('productImage'),handleUploadError,validateRequest(productSchema), UserProductController.createProduct); //create a product

router.get("/company-products",UserProductController.getCompanyProducts)  // get all company products
router.get('/:product_id',UserProductController.getProduct) // get a specific product

router.put("/:product_id",uploadS3.single("productImage"),validateRequest(updateProductSchema),UserProductController.updateProduct) //update a specific product with id

router.delete("/:product_id",UserProductController.deleteProduct) // delete a specific product with id

export default router
