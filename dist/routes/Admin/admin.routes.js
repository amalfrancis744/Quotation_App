"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminController = __importStar(require("..//../controllers/Admin/adminAuth"));
var companyController = __importStar(require("../../controllers/Admin/AddCompany"));
var companyUserController = __importStar(require("..//../controllers/Admin/addCompanyUser"));
var auth_1 = require("../../middleware/Admin/auth");
var validation_1 = require("../../middleware/Validation/validation");
var admin_validation_1 = require("../../middleware/Validation/admin/admin.validation");
var company_validation_1 = require("../../middleware/Validation/company/company.validation");
var updation_validation_1 = require("../../middleware/Validation/company/updation.validation");
var companyUser_validation_1 = require("../../middleware/Validation/companyUser/companyUser.validation");
var router = express_1.default.Router();
router.post("/register", (0, validation_1.validateRequest)(admin_validation_1.adminRegisterSchema), adminController.registerAdmin); //admin create
router.post("/login", adminController.loginAdmin); // admin login
router.post("/companies", auth_1.adminAuthMiddleware, (0, validation_1.validateRequest)(company_validation_1.validateCompanySchema), companyController.createCompany); // company creation by admin
router.post("/companies/addUser", auth_1.adminAuthMiddleware, (0, validation_1.validateRequest)(companyUser_validation_1.validateCompanyUserSchema), companyUserController.AddCompanyUser); // create companyUser by admin
router.get("/companies", auth_1.adminAuthMiddleware, companyController.getAllCompanies); //get all compaies list
router.get("/companies/:company_id", auth_1.adminAuthMiddleware, companyController.getCompany); //get a specific company
router.put("/companies/:company_id", auth_1.adminAuthMiddleware, (0, validation_1.validateRequest)(updation_validation_1.updateValidationCompanySchema), companyController.updateCompany); //update specific company
router.delete("/companies/:company_id", auth_1.adminAuthMiddleware, companyController.deleteCompany); //delete a specific company
exports.default = router;
