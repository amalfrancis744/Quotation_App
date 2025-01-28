"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = __importDefault(require("express"));
// Admin-Side
var admin_routes_1 = __importDefault(require("./Admin/admin.routes"));
// Company-user side
var user_routes_1 = __importDefault(require("./CompanyUser/user.routes"));
var router = express_1.default.Router();
exports.apiRouter = router;
router.use("/admin", admin_routes_1.default);
router.use("/auth", user_routes_1.default);
