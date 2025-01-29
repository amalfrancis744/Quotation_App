import express from "express";
import AdminRoutes from "./Admin/admin.routes"; // Admin-Side
import UserRoutes from "./CompanyUser/userAuth.routes"; // Company-user side

let router = express.Router();

// Main Routes
router.use("/admin", AdminRoutes); // adminside related routes
router.use("/auth", UserRoutes);  // user related routes

export { router as apiRouter };
