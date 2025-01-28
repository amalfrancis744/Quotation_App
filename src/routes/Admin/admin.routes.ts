import express from "express";
import * as adminController from "..//../controllers/Admin/adminAuth";
import * as companyController from "..//../controllers/Admin/company";
import * as companyUserController from "..//../controllers/Admin/addCompanyUser"

const router = express.Router();

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

// company creation by admin
router.post("/companies", companyController.createCompany);
router.get("/companies", companyController.getAllCompanies);

router.get("/companies/:company_id", companyController.getCompanyById);
router.put("/companies/:company_id", companyController.updateCompany);
router.delete("/companies/:company_id",companyController.deleteCompany)


// create companyUser by admin
router.post("/companies/addUser", companyUserController.AddCompanyUser)

export default router;
