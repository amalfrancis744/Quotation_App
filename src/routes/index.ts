import express from "express";
import AdminRoutes from "./Admin/admin.routes"; // Admin-Side
import UserRoutes from "./CompanyUser/userAuth.routes"; // Company-user side
import UserProfileRoutes from "./CompanyUser/userProfile.routes";
import UserProductsRoutes from "./CompanyUser/product.routes";
import UserCustomerRoutes from "./CompanyUser/customer.routes";
import UserQuotationRoutes from "./CompanyUser/quotation.routes"
import { authUserMiddleware } from "../middleware/CompanyUser/auth";

let router = express.Router();

// Main Routes
router.use("/admin", AdminRoutes); // adminside related routes
router.use("/auth", UserRoutes); // companyUser related routes

router.use("/users", authUserMiddleware, UserProfileRoutes); // companyUser profile
router.use("/products", authUserMiddleware, UserProductsRoutes); // companyUser managing products
router.use("/customers", authUserMiddleware, UserCustomerRoutes); // companyUser managing customers
router.use('/quotations',authUserMiddleware,UserQuotationRoutes)

export { router as apiRouter };
