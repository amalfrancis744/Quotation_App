import express from "express";
import AdminRoutes from "./Admin/admin.routes"; // Admin-Side
import UserRoutes from "./CompanyUser/userAuth.routes"; // Company-user side
import UserProfileRoutes from "./CompanyUser/userProfile.routes";
import UserProductsRoutes from "./CompanyUser/product.routes";
import UserCustomerRoutes from "./CompanyUser/customer.routes";
import { authUserMiddleware } from "../middleware/CompanyUser/auth";

let router = express.Router();

// Main Routes
router.use("/admin", AdminRoutes); // adminside related routes
router.use("/auth", UserRoutes); // user related routes

router.use("/users", authUserMiddleware, UserProfileRoutes);
router.use("/products", authUserMiddleware, UserProductsRoutes);

router.use("/customers",authUserMiddleware,UserCustomerRoutes);
export { router as apiRouter };
