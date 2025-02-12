"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getCompanyProducts = exports.createProduct = void 0;
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var userProductRepository = __importStar(require("../../repository/product.Repository"));
var s3_service_1 = require("../../services/s3.service");
var companyRepository = __importStar(require("../../repository/company.Repository"));
var processProductUrl_1 = require("../../utils/processProductUrl");
// Create a new product
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, file, signedUrl, _b, name_1, category, sukCode, hsn, description, gstPercentage, discountPercentage, mrp, saleRate, excubleGST, productData, existingProduct, newProduct, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.UNAUTHORIZED,
                        msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company)];
            case 1:
                companyData = _c.sent();
                if (!companyData) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                if (!req.file) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.BAD_REQUEST,
                        msg: constant_1.ERROR_MSGS.IMAGE_REQUIRED,
                    });
                    return [2 /*return*/];
                }
                file = req.file;
                signedUrl = file.location;
                _b = req.body, name_1 = _b.name, category = _b.category, sukCode = _b.sukCode, hsn = _b.hsn, description = _b.description, gstPercentage = _b.gstPercentage, discountPercentage = _b.discountPercentage, mrp = _b.mrp, saleRate = _b.saleRate, excubleGST = _b.excubleGST;
                if (!name_1 ||
                    !category ||
                    !sukCode ||
                    !hsn ||
                    !description ||
                    !mrp ||
                    !saleRate) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.BAD_REQUEST,
                        msg: constant_1.ERROR_MSGS.MISSING_FEILDS,
                    });
                    return [2 /*return*/];
                }
                productData = {
                    name: name_1,
                    category: category,
                    company: company,
                    sukCode: sukCode,
                    hsn: hsn,
                    description: description,
                    productImage: {
                        key: file.key,
                        imageUrl: signedUrl,
                    },
                    gstPercentage: gstPercentage ? Number(gstPercentage) : undefined,
                    mrp: Number(mrp),
                    saleRate: saleRate ? Number(saleRate) : undefined,
                    excubleGST: excubleGST ? Number(excubleGST) : undefined,
                    discountPercentage: discountPercentage
                        ? Number(discountPercentage)
                        : undefined,
                };
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        sukCode: sukCode,
                        isDeleted: false,
                    })];
            case 2:
                existingProduct = _c.sent();
                if (existingProduct) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.CONFLICT,
                        msg: constant_1.ERROR_MSGS.PRODUCT_ALREADY_EXISTS,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userProductRepository.InsertData(productData)];
            case 3:
                newProduct = _c.sent();
                response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.CREATED,
                    msg: constant_1.INFO_MSGS.PRODUCT_CREATED_SUCCESSFULLY,
                    data: newProduct,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_1 instanceof Error ? error_1.message : String(error_1),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
// List all products for the current company
var getCompanyProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, comapnyData, page, limit, sortBy, order, includeDeleted, skip, filter, products, totalProducts, error_2;
    var _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company)];
            case 1:
                comapnyData = _d.sent();
                if (!comapnyData) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                sortBy = req.query.sortBy || "createdAt";
                order = ((_c = req.query.order) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === "asc" ? 1 : -1;
                includeDeleted = req.query.includeDeleted === "true";
                skip = (page - 1) * limit;
                filter = __assign({ company: company }, (includeDeleted ? {} : { isDeleted: false }));
                return [4 /*yield*/, userProductRepository.findAll(filter, {
                        skip: skip,
                        limit: limit,
                        sort: (_b = {}, _b[sortBy] = order, _b),
                    })];
            case 2:
                products = _d.sent();
                return [4 /*yield*/, userProductRepository.CountAllProducts({
                        company: company,
                    })];
            case 3:
                totalProducts = _d.sent();
                response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.OK,
                    msg: constant_1.INFO_MSGS.COMPANY_PRODUCT_FETCHED,
                    data: {
                        ProductsList: products,
                        pagination: {
                            currentPage: page,
                            totalPages: Math.ceil(totalProducts / limit),
                            totalItems: totalProducts,
                            itemsPerPage: limit,
                        },
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_2 instanceof Error ? error_2.message : String(error_2),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCompanyProducts = getCompanyProducts;
// Retrieve a specific product
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, productId, product, processedProduct, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.UNAUTHORIZED,
                        msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company)];
            case 1:
                companyData = _b.sent();
                if (!companyData) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                productId = req.params.product_id;
                if (!productId) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.BAD_REQUEST,
                        msg: constant_1.ERROR_MSGS.INVALID_PRODUCT_ID,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: productId,
                        company: company,
                        isDeleted: false,
                    })];
            case 2:
                product = _b.sent();
                if (!product) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.PRODUCT_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, processProductUrl_1.processProductUrl)([product])];
            case 3:
                processedProduct = (_b.sent())[0];
                response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.OK,
                    msg: constant_1.INFO_MSGS.PRODUCT_FETCHED,
                    data: processedProduct,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_3 instanceof Error ? error_3.message : String(error_3),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = getProduct;
// Update a specific product
var updateProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, productId, product, _b, name_2, category, sukCode, hsn, description, gstPercentage, discountPercentage, mrp, saleRate, excubleGST, existingProduct, existingProductWithName, s3Service, oldKey, signedUrl, updatedProduct, error_4;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 12, , 13]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.UNAUTHORIZED,
                        msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company)];
            case 1:
                companyData = _d.sent();
                if (!companyData) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                productId = req.params.product_id;
                if (!productId) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.BAD_REQUEST,
                        msg: constant_1.ERROR_MSGS.INVALID_PRODUCT_ID,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: productId,
                        company: company,
                        isDeleted: false,
                    })];
            case 2:
                product = _d.sent();
                if (!product) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.PRODUCT_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                _b = req.body, name_2 = _b.name, category = _b.category, sukCode = _b.sukCode, hsn = _b.hsn, description = _b.description, gstPercentage = _b.gstPercentage, discountPercentage = _b.discountPercentage, mrp = _b.mrp, saleRate = _b.saleRate, excubleGST = _b.excubleGST;
                if (!(sukCode && sukCode !== product.sukCode)) return [3 /*break*/, 4];
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        sukCode: sukCode,
                        isDeleted: false,
                        _id: { $ne: productId }, // Exclude current product
                    })];
            case 3:
                existingProduct = _d.sent();
                if (existingProduct) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.CONFLICT,
                        msg: constant_1.ERROR_MSGS.PRODUCT_ALREADY_EXISTS,
                    });
                    return [2 /*return*/];
                }
                _d.label = 4;
            case 4:
                if (!(name_2 && name_2 !== product.name)) return [3 /*break*/, 6];
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        name: name_2,
                        isDeleted: false,
                        _id: { $ne: productId }, // Exclude current product
                    })];
            case 5:
                existingProductWithName = _d.sent();
                if (existingProductWithName) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.CONFLICT,
                        msg: constant_1.ERROR_MSGS.PRODUCT_NAME_EXISTS,
                    });
                    return [2 /*return*/];
                }
                _d.label = 6;
            case 6:
                if (!req.file) return [3 /*break*/, 10];
                s3Service = new s3_service_1.S3Service();
                oldKey = (_c = product.productImage) === null || _c === void 0 ? void 0 : _c.key;
                if (!oldKey) return [3 /*break*/, 8];
                return [4 /*yield*/, s3Service.deleteFile(oldKey)];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8: return [4 /*yield*/, s3Service.getSignedUrl(req.file.key)];
            case 9:
                signedUrl = _d.sent();
                // Update product image details
                product.productImage = {
                    key: req.file.key,
                    imageUrl: signedUrl,
                };
                _d.label = 10;
            case 10:
                product.name = name_2 || product.name;
                product.category = category || product.category;
                product.sukCode = sukCode || product.sukCode;
                product.hsn = hsn || product.hsn;
                product.description = description || product.description;
                product.gstPercentage = gstPercentage
                    ? Number(gstPercentage)
                    : product.gstPercentage;
                product.mrp = mrp ? Number(mrp) : product.mrp;
                product.saleRate = saleRate ? Number(saleRate) : product.saleRate;
                product.excubleGST = excubleGST ? Number(excubleGST) : product.excubleGST;
                product.discountPercentage = discountPercentage
                    ? Number(discountPercentage)
                    : product.discountPercentage;
                return [4 /*yield*/, userProductRepository.UpdateById(productId, product)];
            case 11:
                updatedProduct = _d.sent();
                response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.OK,
                    msg: constant_1.INFO_MSGS.PRODUCT_UPDATED_SUCCESSFULLY,
                    data: updatedProduct,
                });
                return [3 /*break*/, 13];
            case 12:
                error_4 = _d.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_4 instanceof Error ? error_4.message : String(error_4),
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, productId, product, softDeletedProduct, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company)];
            case 1:
                companyData = _b.sent();
                if (!companyData) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                productId = req.params.product_id;
                if (!productId) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.BAD_REQUEST,
                        msg: constant_1.ERROR_MSGS.INVALID_PRODUCT_ID,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: productId,
                        company: company,
                        isDeleted: false,
                    })];
            case 2:
                product = _b.sent();
                if (!product) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.PRODUCT_NOT_FOUND,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userProductRepository.UpdateById(productId, {
                        isDeleted: true,
                        deletedAt: new Date(),
                        deletedBy: userId,
                    })];
            case 3:
                softDeletedProduct = _b.sent();
                response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.OK,
                    msg: constant_1.INFO_MSGS.PRODUCT_DELETED_SUCCESSFULLY,
                    data: { productId: softDeletedProduct._id },
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_5 instanceof Error ? error_5.message : String(error_5),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
