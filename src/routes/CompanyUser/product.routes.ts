import express from "express";
import * as UserProductController from "../../controllers/CompanyUser/userProducts";
import { uploadS3 } from "../../middleware/FileUpload/fileUpload";

const router = express.Router();

router.post("/create", uploadS3.single('productImage'), UserProductController.createProduct);


export default router
