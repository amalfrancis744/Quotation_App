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
var UserCustomerController = __importStar(require("../../controllers/CompanyUser/companyCustomer"));
var validation_1 = require("../../middleware/Validation/validation");
var customer_validate_1 = require("../../middleware/Validation/customer/customer.validate");
var updateCustomer_validate_1 = require("../../middleware/Validation/customer/updateCustomer.validate");
var router = express_1.default.Router();
router.post('/create-customer', (0, validation_1.validateRequest)(customer_validate_1.customerSchema), UserCustomerController.createCustomer); //create new customer
router.get("/all-company-customers", UserCustomerController.getAllCompanyCustomers); //get all company customers list
router.get("/:customer_id", UserCustomerController.getCustomer); //get a specific customer data
router.put("/:customer_id", (0, validation_1.validateRequest)(updateCustomer_validate_1.updateCustomerSchema), UserCustomerController.updateCustomer); //update a spcific customer data 
router.delete("/:customer_id", UserCustomerController.deleteCustomer); // delete a specific customer data
exports.default = router;
