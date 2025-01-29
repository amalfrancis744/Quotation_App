import express from "express";
import * as userController from "../../controllers/CompanyUser/userAuth";
import { authUserMiddleware } from "../../middleware/CompanyUser/auth";


const router = express.Router();

// Company user login
router.post("/login", userController.loginCompanyUser);
// forgotPassword send mail with unique URL (token)
router.post("/forgotPassword",userController.forgotPassword);
//  changing password
router.post("/password-reset",userController.resetPassword);


// for verifying the url 
router.get("/verify-token",userController.verifyUrl);



export default router;
