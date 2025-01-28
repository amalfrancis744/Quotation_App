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
exports.deleteCompany = exports.updateCompany = exports.getCompanyById = exports.createCompany = exports.getAllCompanies = void 0;
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var companyRepository = __importStar(require("../../repository/company.Repository"));
var comapny_model_1 = require("../../models/comapny.model");
var getAllCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companies, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, companyRepository.findAllCompanies()];
            case 1:
                companies = _a.sent();
                if (!companies) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        data: companies,
                    })];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCompanies = getAllCompanies;
var createCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyName, alias, addresses, accountDetails, website, email, mobileNo, state, existsCompany, checkEmail, company, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, companyName = _a.companyName, alias = _a.alias, addresses = _a.addresses, accountDetails = _a.accountDetails, website = _a.website, email = _a.email, mobileNo = _a.mobileNo, state = _a.state;
                return [4 /*yield*/, companyRepository.findCompanyNameByCompany(companyName)];
            case 1:
                existsCompany = _b.sent();
                // Add null/undefined check
                if (existsCompany) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.COMPANY_ALREADY_EXISTS,
                        })];
                }
                email = email.toLowerCase();
                return [4 /*yield*/, companyRepository.findEmailByCompany(email)];
            case 2:
                checkEmail = _b.sent();
                if (checkEmail) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.EMAIL_ALREADY_EXISTS,
                        })];
                }
                company = new comapny_model_1.Company({
                    companyName: companyName,
                    alias: alias,
                    addresses: addresses,
                    accountDetails: accountDetails,
                    website: website,
                    email: email,
                    mobileNo: mobileNo,
                    state: state,
                });
                return [4 /*yield*/, company.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.CREATED,
                        msg: constant_1.ERROR_MSGS.COMPANY_CREATED_SUCCESSFULLY,
                    })];
            case 4:
                error_2 = _b.sent();
                console.error("Error creating company:", error_2);
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: "Error creating company",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCompany = createCompany;
//   get specific company
var getCompanyById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                companyId = req.params.company_id;
                if (!companyId) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.COMPANY_ID_REQUIRED,
                        })];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(companyId)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.COMPANY_FETCHED,
                        data: result,
                    })];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching", error_3);
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: "Error fetching company",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCompanyById = getCompanyById;
// Update a specific company
var updateCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, _a, companyName, alias, addresses, accountDetails, website, email, mobileNo, state, existingCompany, normalizedEmail, emailExistes, companyExits, updateData, updatedData, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                companyId = req.params.company_id;
                _a = req.body, companyName = _a.companyName, alias = _a.alias, addresses = _a.addresses, accountDetails = _a.accountDetails, website = _a.website, email = _a.email, mobileNo = _a.mobileNo, state = _a.state;
                // Validate comapny ID
                if (!companyId) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.COMPANY_ID_REQUIRED,
                        })];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(companyId)];
            case 1:
                existingCompany = _b.sent();
                if (!existingCompany) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                if (!email) return [3 /*break*/, 3];
                normalizedEmail = email.toLowerCase().trim();
                return [4 /*yield*/, companyRepository.findEmailByEmailCompanyId(normalizedEmail, companyId)];
            case 2:
                emailExistes = _b.sent();
                if (emailExistes) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.EMAIL_ALREADY_EXISTS,
                        })];
                }
                _b.label = 3;
            case 3:
                if (!companyName) return [3 /*break*/, 5];
                return [4 /*yield*/, companyRepository.findCompayByCompanyNameAndSame(companyName, companyId)];
            case 4:
                companyExits = _b.sent();
                if (companyExits) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.COMPANY_ALREADY_EXISTS,
                        })];
                }
                _b.label = 5;
            case 5:
                updateData = __assign(__assign({}, req.body), { email: email === null || email === void 0 ? void 0 : email.toLowerCase() });
                return [4 /*yield*/, companyRepository.findByIdAndUpdate(companyId, updateData)];
            case 6:
                updatedData = _b.sent();
                if (!updatedData) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.COMPANY_UPDATED_SUCCESSFULLY,
                        data: updatedData,
                    })];
            case 7:
                error_4 = _b.sent();
                console.error("Error updating company:", error_4);
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: "Error updating company",
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateCompany = updateCompany;
var deleteCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var company_id, existingCompany, deleteCompany_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                company_id = req.params.company_id;
                // Validate comapny ID
                if (!company_id) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.COMPANY_ID_REQUIRED,
                        })];
                }
                return [4 /*yield*/, companyRepository.findCompanyById(company_id)];
            case 1:
                existingCompany = _a.sent();
                if (!existingCompany) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.COMAPNY_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, companyRepository.findByIdAndUpdate(company_id, {
                        isDeleted: true,
                        deletedAt: new Date()
                    })];
            case 2:
                deleteCompany_1 = _a.sent();
                if (!deleteCompany_1) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.DELETE_FAILED
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.ERROR_MSGS.COMPANY_DELETED
                    })];
            case 3:
                error_5 = _a.sent();
                console.error("Error updating company:", error_5);
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: "Error updating company",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCompany = deleteCompany;
