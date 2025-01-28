import express, { Request, Response } from "express";
import * as userController from "../../controllers/CompanyUser/userAuth";
import { authUserMiddleware } from "../../middleware/CompanyUser/auth";


const router = express.Router();

// Company user login

router.post("/login", userController.loginCompanyUser);
// router.post("/welcome", authUserMiddleware, (req:any, res:Response) => {
//       console.log(req.user);
//   res.send("Welcome to company user");
 
// });
router.post("/forgotPassword",authUserMiddleware,userController.forgotPassword); 


// re

export default router;
