"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = __importDefault(require("express"));
var admin_routes_1 = __importDefault(require("./Admin/admin.routes")); // Admin-Side
var userAuth_routes_1 = __importDefault(require("./CompanyUser/userAuth.routes")); // Company-user side
var userProfile_routes_1 = __importDefault(require("./CompanyUser/userProfile.routes"));
var product_routes_1 = __importDefault(require("./CompanyUser/product.routes"));
var customer_routes_1 = __importDefault(require("./CompanyUser/customer.routes"));
var quotation_routes_1 = __importDefault(require("./CompanyUser/quotation.routes"));
var auth_1 = require("../middleware/CompanyUser/auth");
var router = express_1.default.Router();
exports.apiRouter = router;
// Main Routes
router.use("/admin", admin_routes_1.default); // adminside related routes
router.use("/auth", userAuth_routes_1.default); // companyUser related routes
router.use("/users", auth_1.authUserMiddleware, userProfile_routes_1.default); // companyUser profile
router.use("/products", auth_1.authUserMiddleware, product_routes_1.default); // companyUser managing products
router.use("/customers", auth_1.authUserMiddleware, customer_routes_1.default); // companyUser managing customers
router.use('/quotations', auth_1.authUserMiddleware, quotation_routes_1.default);
