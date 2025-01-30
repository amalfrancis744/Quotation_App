import express from "express";
import * as userAuthController from "../../controllers/CompanyUser/userAuth";
import { authUserMiddleware } from "../../middleware/CompanyUser/auth";


const router = express.Router();

// Company user login
router.post("/login", userAuthController.loginCompanyUser);
// forgotPassword send mail with unique URL (token)
router.post("/forgotPassword",userAuthController.forgotPassword);
//  changing password
router.post("/password-reset",userAuthController.resetPassword);


// for verifying the url 
router.get("/verify-token",userAuthController.verifyUrl);



export default router;
