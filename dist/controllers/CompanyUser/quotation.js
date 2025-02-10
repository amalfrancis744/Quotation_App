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
exports.generateQuotationPdf = exports.deleteQuotationItemById = exports.updateQuotationItemById = exports.getQuotationItemsById = exports.deleteQuotation = exports.updateQuation = exports.getQuotation = exports.getAllCompaniesQuotation = exports.createQuotation = void 0;
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var userProductRepository = __importStar(require("../../repository/product.Repository"));
var userQuotationRepository = __importStar(require("../../repository/quotation.Repository"));
var companyRepository = __importStar(require("../../repository/company.Repository"));
var companyCustomerRepository = __importStar(require("../../repository/customer.Repository"));
var quotation_model_1 = __importDefault(require("../../models/quotation.model"));
var pdfGenerator_1 = require("../../services/pdfGenerator");
var createQuotation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, _b, contractor, items, jNo, party, email, billQty, salesMan, discPercentage, netAmount, grossAmount, overallDiscount, quotationFormat, totalAmount, _i, items_1, item, validProduct, customerId, isCustomerValid, isJNoExists, newQuotation, savedQuotation, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
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
                _b = req.body, contractor = _b.contractor, items = _b.items, jNo = _b.jNo, party = _b.party, email = _b.email, billQty = _b.billQty, salesMan = _b.salesMan, discPercentage = _b.discPercentage, netAmount = _b.netAmount, grossAmount = _b.grossAmount, overallDiscount = _b.overallDiscount, quotationFormat = _b.quotationFormat, totalAmount = _b.totalAmount;
                // Validate items array
                if (!Array.isArray(items) || items.length === 0) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_ITEMS,
                        })];
                }
                _i = 0, items_1 = items;
                _c.label = 2;
            case 2:
                if (!(_i < items_1.length)) return [3 /*break*/, 5];
                item = items_1[_i];
                if (!item.product) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.PRODUCT_ID_REQUIRED,
                        })];
                }
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: item.product,
                        company: company,
                        isDeleted: false,
                    })];
            case 3:
                validProduct = _c.sent();
                if (!validProduct) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: "Product with ID ".concat(item.product, " not found or doesn't belong to this company"),
                        })];
                }
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                customerId = contractor;
                return [4 /*yield*/, companyCustomerRepository.getCustomerWithCompanyDetails(customerId, company)];
            case 6:
                isCustomerValid = _c.sent();
                if (!isCustomerValid) {
                    response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.NOT_FOUND,
                        msg: constant_1.ERROR_MSGS.CUSTOMER_NOT_FOUND,
                    });
                }
                return [4 /*yield*/, userQuotationRepository.findWithFeild(jNo)];
            case 7:
                isJNoExists = _c.sent();
                if (isJNoExists) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.CONFLICT,
                            msg: constant_1.ERROR_MSGS.JNO_ALREADY_EXISTS,
                        })];
                }
                newQuotation = new quotation_model_1.default({
                    company: company,
                    contractor: customerId,
                    items: items,
                    jNo: jNo,
                    party: party,
                    email: email,
                    billQty: billQty,
                    salesMan: salesMan,
                    discPercentage: discPercentage,
                    netAmount: netAmount,
                    grossAmount: grossAmount,
                    overallDiscount: overallDiscount,
                    totalAmount: totalAmount,
                    quotationFormat: quotationFormat,
                });
                return [4 /*yield*/, newQuotation.save()];
            case 8:
                savedQuotation = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.CREATED,
                        data: savedQuotation,
                        msg: constant_1.INFO_MSGS.QUOTATION_CREATED,
                    })];
            case 9:
                error_1 = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_1 instanceof Error ? error_1.message : String(error_1),
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createQuotation = createQuotation;
// List all quotations for the current company
var getAllCompaniesQuotation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotations, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
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
                return [4 /*yield*/, userQuotationRepository.findQuotationsByCompany(company._id)];
            case 2:
                quotations = _b.sent();
                if (quotations.length === 0 || quotations === null) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.NO_QUOTATION_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.QUOTATION_RETRIEVED,
                        data: quotations,
                    })];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_2 instanceof Error ? error_2.message : String(error_2),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllCompaniesQuotation = getAllCompaniesQuotation;
// Retrieve a specific quotation
var getQuotation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotation_id, quotation, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
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
                quotation_id = req.params.quotation_id;
                return [4 /*yield*/, userQuotationRepository.findQuotationById(quotation_id)];
            case 2:
                quotation = _b.sent();
                if (!quotation) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_NOT_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        data: quotation,
                        msg: constant_1.INFO_MSGS.QUOTATION_RETRIEVED,
                    })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_3 instanceof Error ? error_3.message : String(error_3),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getQuotation = getQuotation;
// Update a specific quotation (including status).
var updateQuation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotation_id, quotation, _b, contractor, items, jNo, party, email, billQty, salesMan, discPercentage, netAmount, grossAmount, overallDiscount, quotationFormat, totalAmount, status_1, existsJnoWithOtherQuotations, isCustomerValid, _i, items_2, item, validProduct, updateData, update, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 12, , 13]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
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
                quotation_id = req.params.quotation_id;
                return [4 /*yield*/, userQuotationRepository.findQuotationById(quotation_id)];
            case 2:
                quotation = _c.sent();
                if (!quotation) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_NOT_FOUND,
                        })];
                }
                _b = req.body, contractor = _b.contractor, items = _b.items, jNo = _b.jNo, party = _b.party, email = _b.email, billQty = _b.billQty, salesMan = _b.salesMan, discPercentage = _b.discPercentage, netAmount = _b.netAmount, grossAmount = _b.grossAmount, overallDiscount = _b.overallDiscount, quotationFormat = _b.quotationFormat, totalAmount = _b.totalAmount, status_1 = _b.status;
                if (!(jNo && jNo !== quotation.jNo)) return [3 /*break*/, 4];
                return [4 /*yield*/, userQuotationRepository.findWithFeild(jNo)];
            case 3:
                existsJnoWithOtherQuotations = _c.sent();
                if (existsJnoWithOtherQuotations) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.CONFLICT,
                            msg: constant_1.ERROR_MSGS.JNO_ALREADY_EXISTS,
                        })];
                }
                _c.label = 4;
            case 4:
                if (!(contractor && contractor !== quotation.contractor.toString())) return [3 /*break*/, 6];
                return [4 /*yield*/, companyCustomerRepository.getCustomerWithCompanyDetails(contractor, company)];
            case 5:
                isCustomerValid = _c.sent();
                if (!isCustomerValid) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.CUSTOMER_NOT_FOUND,
                        })];
                }
                _c.label = 6;
            case 6:
                if (!(items && Array.isArray(items))) return [3 /*break*/, 10];
                if (items.length === 0) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_ITEMS,
                        })];
                }
                _i = 0, items_2 = items;
                _c.label = 7;
            case 7:
                if (!(_i < items_2.length)) return [3 /*break*/, 10];
                item = items_2[_i];
                if (!item.product) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.PRODUCT_ID_REQUIRED,
                        })];
                }
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: item.product,
                        company: company,
                        isDeleted: false,
                    })];
            case 8:
                validProduct = _c.sent();
                if (!validProduct) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: "Product with ID ".concat(item.product, " not found or doesn't belong to this company"),
                        })];
                }
                _c.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 7];
            case 10:
                updateData = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (contractor && { contractor: contractor })), (items && { items: items })), (jNo && { jNo: jNo })), (party && { party: party })), (email && { email: email })), (status_1 && { status: status_1 })), (billQty && { billQty: billQty })), (salesMan && { salesMan: salesMan })), (discPercentage !== undefined && { discPercentage: discPercentage })), (netAmount && { netAmount: netAmount })), (grossAmount && { grossAmount: grossAmount })), (overallDiscount !== undefined && { overallDiscount: overallDiscount })), (quotationFormat && { quotationFormat: quotationFormat })), (totalAmount && { totalAmount: totalAmount })), { updatedBy: userId, updatedAt: new Date() });
                return [4 /*yield*/, userQuotationRepository.updateById(quotation_id, updateData)];
            case 11:
                update = _c.sent();
                if (!update) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                            msg: "Failed to update quotation",
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        data: update,
                        msg: constant_1.INFO_MSGS.QUOTATION_UPDATED,
                    })];
            case 12:
                error_4 = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_4 instanceof Error ? error_4.message : String(error_4),
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.updateQuation = updateQuation;
var deleteQuotation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotation_id, quotation, deleteQuotation_1, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
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
                quotation_id = req.params.quotation_id;
                return [4 /*yield*/, userQuotationRepository.findQuotationById(quotation_id)];
            case 2:
                quotation = _b.sent();
                if (!quotation) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, userQuotationRepository.updateById(quotation_id, { isDeleted: true, deletedAt: new Date(), deletedBy: userId })];
            case 3:
                deleteQuotation_1 = _b.sent();
                if (!deleteQuotation_1) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                            msg: constant_1.ERROR_MSGS.QUOTATION_DELETE_FAILED,
                        })];
                }
                response_1.GlobleResponse.success({
                    res: res,
                    msg: constant_1.INFO_MSGS.QUOTATION_DELETED_SUCCESSFULL,
                    status: http_status_1.default.OK,
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
exports.deleteQuotation = deleteQuotation;
// List all items in a specific quotation
var getQuotationItemsById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotation_id, quotation, items, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
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
                quotation_id = req.params.quotation_id;
                return [4 /*yield*/, userQuotationRepository.findQuotationById(quotation_id)];
            case 2:
                quotation = _b.sent();
                if (!quotation) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_NOT_FOUND,
                        })];
                }
                items = quotation.items;
                if (items.length === 0) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.NO_ITEMS_IN_QUOTATION,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        data: items,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.ITEMS_FETCHED,
                    })];
            case 3:
                error_6 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_6 instanceof Error ? error_6.message : String(error_6),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getQuotationItemsById = getQuotationItemsById;
// Update an item in a quotation
var updateQuotationItemById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, _b, quotation_id, item_Id, quotationWithItem, _c, product_id, price, quantity, validProduct, updatedItem, error_7;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
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
                _b = req.params, quotation_id = _b.quotation_id, item_Id = _b.item_Id;
                return [4 /*yield*/, userQuotationRepository.checkQuotationItemExists(quotation_id, item_Id)];
            case 2:
                quotationWithItem = _d.sent();
                if (!quotationWithItem) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_ITEM_NOT_FOUND,
                        })];
                }
                _c = req.body, product_id = _c.product_id, price = _c.price, quantity = _c.quantity;
                return [4 /*yield*/, userProductRepository.findOneByFeild({
                        _id: product_id,
                        company: company,
                        isDeleted: false,
                    })];
            case 3:
                validProduct = _d.sent();
                if (!validProduct) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: "Product with ID ".concat(product_id, " not found or doesn't belong to this company"),
                        })];
                }
                return [4 /*yield*/, userQuotationRepository.updateQuotationItem(item_Id, { product_id: product_id, price: price, quantity: quantity })];
            case 4:
                updatedItem = _d.sent();
                if (!updatedItem) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                            msg: constant_1.ERROR_MSGS.ITEM_UPDATION_FAILED,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.ITEM_UPDATION_SUCCESSFULLY,
                    })];
            case 5:
                error_7 = _d.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_7 instanceof Error ? error_7.message : String(error_7),
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateQuotationItemById = updateQuotationItemById;
var deleteQuotationItemById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, _b, quotation_id, item_Id, quotationWithItem, deleteItem, error_8;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
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
                _b = req.params, quotation_id = _b.quotation_id, item_Id = _b.item_Id;
                return [4 /*yield*/, userQuotationRepository.checkQuotationItemExists(quotation_id, item_Id)];
            case 2:
                quotationWithItem = _c.sent();
                if (!quotationWithItem) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_ITEM_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, userQuotationRepository.deleteQuotationItem(item_Id)];
            case 3:
                deleteItem = _c.sent();
                if (deleteItem) {
                    return [2 /*return*/, response_1.GlobleResponse.success({
                            res: res,
                            msg: constant_1.INFO_MSGS.QUOTATION_ITEM_DELETED_SUCCESSFULLY,
                            status: http_status_1.default.OK,
                        })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_8 = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_8 instanceof Error ? error_8.message : String(error_8),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteQuotationItemById = deleteQuotationItemById;
var generateQuotationPdf = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, quotation_id, quotation, pdfDoc, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
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
                quotation_id = req.params.quotation_id;
                return [4 /*yield*/, userQuotationRepository.findQuotationById(quotation_id)];
            case 2:
                quotation = _b.sent();
                if (!quotation) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.QUOTATION_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, (0, pdfGenerator_1.generateQuotationPDF)(quotation)];
            case 3:
                pdfDoc = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        data: {
                            pdfDoc: pdfDoc,
                            quotation: quotation,
                        },
                    })];
            case 4:
                error_9 = _b.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.generateQuotationPdf = generateQuotationPdf;
