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
var UserProductController = __importStar(require("../../controllers/CompanyUser/userProducts"));
var fileUpload_1 = require("../../middleware/FileUpload/fileUpload");
var validation_1 = require("../../middleware/Validation/validation");
var product_validate_1 = require("../../middleware/Validation/product/product.validate");
var updateProduct_validate_1 = require("../../middleware/Validation/product/updateProduct.validate");
var router = express_1.default.Router();
router.post("/create", fileUpload_1.uploadS3.single('productImage'), fileUpload_1.handleUploadError, (0, validation_1.validateRequest)(product_validate_1.productSchema), UserProductController.createProduct); //create a product
router.get("/company-products", UserProductController.getCompanyProducts); // get all company products
router.get('/:product_id', UserProductController.getProduct); // get a specific product
router.put("/:product_id", fileUpload_1.uploadS3.single("productImage"), (0, validation_1.validateRequest)(updateProduct_validate_1.updateProductSchema), UserProductController.updateProduct); //update a specific product with id
router.delete("/:product_id", UserProductController.deleteProduct); // delete a specific product with id
exports.default = router;
