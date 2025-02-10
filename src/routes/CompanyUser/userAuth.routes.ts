import express from "express";
import * as userAuthController from "../../controllers/CompanyUser/userAuth";
import { validateRequest } from "../../middleware/Validation/validation";
import { resetPasswordCompanyUserSchema } from "../../middleware/Validation/companyUser/resetPassword.validation";


const router = express.Router();

router.post("/login", userAuthController.loginCompanyUser); // Company user login
router.post("/forgotPassword",userAuthController.forgotPassword); // forgotPassword send mail with unique URL (token)
router.post("/password-reset", validateRequest(resetPasswordCompanyUserSchema),userAuthController.resetPassword); //  changing password
router.get("/verify-token",userAuthController.verifyUrl); // for verifying the url 

export default router;
