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

router.post("/register",validateRequest(adminRegisterSchema), adminController.registerAdmin); //admin create
router.post("/login", adminController.loginAdmin); // admin login
router.post("/companies", adminAuthMiddleware,validateRequest(validateCompanySchema),companyController.createCompany);// company creation by admin
router.post("/companies/addUser",adminAuthMiddleware,validateRequest(validateCompanyUserSchema),companyUserController.AddCompanyUser) // create companyUser by admin

router.get("/companies", adminAuthMiddleware,companyController.getAllCompanies); //get all compaies list
router.get("/companies/:company_id", adminAuthMiddleware,companyController.getCompany); //get a specific company

router.put("/companies/:company_id", adminAuthMiddleware,validateRequest(updateValidationCompanySchema),companyController.updateCompany); //update specific company

router.delete("/companies/:company_id",adminAuthMiddleware,companyController.deleteCompany) //delete a specific company




export default router;
