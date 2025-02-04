import express from "express";
import * as adminController from "..//../controllers/Admin/adminAuth";
import * as companyController from "../../controllers/Admin/AddCompany";
import * as companyUserController from "..//../controllers/Admin/addCompanyUser"
import { adminAuthMiddleware } from "../../middleware/Admin/auth";
import { validateRequest } from "../../middleware/Validation/validation";
import { adminRegisterSchema } from "../../middleware/Validation/admin/admin.validation";
import { validateCompanySchema } from "../../middleware/Validation/company/company.validation";
import { updateValidationCompanySchema } from "../../middleware/Validation/company/updation.validation";
import { validateCompanyUserSchema } from "../../middleware/Validation/companyUser/companyUser.validation";

const router = express.Router();

router.post("/register",validateRequest(adminRegisterSchema), adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

// company creation by admin
router.post("/companies", adminAuthMiddleware,validateRequest(validateCompanySchema),companyController.createCompany);
router.get("/companies", adminAuthMiddleware,companyController.getAllCompanies);

router.get("/companies/:company_id", adminAuthMiddleware,companyController.getCompany);
router.put("/companies/:company_id", adminAuthMiddleware,validateRequest(updateValidationCompanySchema),companyController.updateCompany);
router.delete("/companies/:company_id",adminAuthMiddleware,companyController.deleteCompany)


// create companyUser by admin
router.post("/companies/addUser",adminAuthMiddleware,validateRequest(validateCompanyUserSchema),companyUserController.AddCompanyUser)

export default router;
