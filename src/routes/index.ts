import express from "express";

// Admin-Side
import AdminRoutes from "./Admin/admin.routes";

// Company-user side
import UserRoutes from "./CompanyUser/user.routes";

let router = express.Router();

router.use("/admin", AdminRoutes);
router.use("/auth", UserRoutes);

export { router as apiRouter };
