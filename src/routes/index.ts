import express from "express";

// Admin-Side
import AdminRoutes from "./Admin/admin.routes";


let router = express.Router()




router.use('/admin',AdminRoutes)


export {router as apiRouter}