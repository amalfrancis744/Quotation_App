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
exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.getAllCompanyCustomers = exports.createCustomer = void 0;
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var companyCustomerRepository = __importStar(require("../../repository/customer.Repository"));
var companyRepository = __importStar(require("../../repository/company.Repository"));
// create new customer
var createCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, companyData, _b, name_1, email, mobileNo, _c, nameExists, emailExists, mobileExists, existingFields, hasExistingFields, message, duplicates, newCustomer, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                            status: http_status_1.default.UNAUTHORIZED,
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
                _b = req.body, name_1 = _b.name, email = _b.email, mobileNo = _b.mobileNo;
                if (!name_1 || !email || !mobileNo) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            msg: constant_1.ERROR_MSGS.MISSING_FEILDS,
                            status: http_status_1.default.BAD_REQUEST,
                        })];
                }
                return [4 /*yield*/, companyCustomerRepository.FindCustomerByAll(name_1, email, company, mobileNo)];
            case 2:
                _c = _d.sent(), nameExists = _c.nameExists, emailExists = _c.emailExists, mobileExists = _c.mobileExists;
                existingFields = {
                    name: !!nameExists,
                    email: !!emailExists,
                    mobileNo: !!mobileExists,
                };
                hasExistingFields = Object.values(existingFields).some(function (value) { return value; });
                message = "";
                if (hasExistingFields) {
                    duplicates = [];
                    if (existingFields.name)
                        duplicates.push("name");
                    if (existingFields.email)
                        duplicates.push("email");
                    if (existingFields.mobileNo)
                        duplicates.push("mobile number");
                    message = "Customer already exists with: ".concat(duplicates.join(", "));
                }
                if (hasExistingFields) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            msg: message,
                            status: http_status_1.default.CONFLICT,
                        })];
                }
                return [4 /*yield*/, companyCustomerRepository.createCustomer({
                        name: name_1,
                        email: email,
                        mobileNo: mobileNo,
                        company: company,
                        isDeleted: false,
                    })];
            case 3:
                newCustomer = _d.sent();
                if (newCustomer) {
                    return [2 /*return*/, response_1.GlobleResponse.success({
                            res: res,
                            msg: constant_1.INFO_MSGS.CUSTOMER_CREATED,
                            status: http_status_1.default.CREATED,
                        })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_1 instanceof Error ? error_1.message : String(error_1),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCustomer = createCustomer;
// List all customers for the current company.
var getAllCompanyCustomers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, customers, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.user, userId = _a.userId, company = _a.company;
                // Validate user and company
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                return [4 /*yield*/, companyCustomerRepository.getCustomersByCompany(company)];
            case 1:
                customers = _b.sent();
                //no customers found
                if (!customers.length) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.NO_CUSTOMERS_FOUND,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        msg: constant_1.INFO_MSGS.CUSTOMERS_LISTED,
                        status: http_status_1.default.OK,
                        data: customers,
                    })];
            case 2:
                error_2 = _b.sent();
                // Handle unexpected errors
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_2 instanceof Error ? error_2.message : String(error_2),
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCompanyCustomers = getAllCompanyCustomers;
//Retrieve a specific customer
var getCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, customer_id, customer, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                customer_id = req.params.customer_id;
                return [4 /*yield*/, companyCustomerRepository.findCustomerByIdandCompany(customer_id, { company: company })];
            case 1:
                customer = _b.sent();
                if (customer) {
                    return [2 /*return*/, response_1.GlobleResponse.success({
                            res: res,
                            msg: constant_1.INFO_MSGS.CUSTOMER_RETRIEVED,
                            status: http_status_1.default.OK,
                            data: customer,
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_3 instanceof Error ? error_3.message : String(error_3),
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCustomer = getCustomer;
// Update a specific customer
var updateCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, customer_id, customer, _b, name_2, email, phone, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                customer_id = req.params.customer_id;
                return [4 /*yield*/, companyCustomerRepository.findCustomerById(customer_id)];
            case 1:
                customer = _c.sent();
                if (!customer) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.CUSTOMER_NOT_FOUND,
                        })];
                }
                _b = req.body, name_2 = _b.name, email = _b.email, phone = _b.phone;
                // Update customer detail
                customer.name = name_2 || customer.name;
                customer.email = email || customer.email;
                customer.mobileNo = phone || customer.mobileNo;
                return [4 /*yield*/, customer.save()];
            case 2:
                _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.CUSTOMER_UPDATED,
                    })];
            case 3:
                error_4 = _c.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_4 instanceof Error ? error_4.message : String(error_4),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCustomer = updateCustomer;
// Remove an item from a quotation
var deleteCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, company, customer_id, customer, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.user, userId = _a.userId, company = _a.company;
                if (!userId || !company) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.AUTH_FAILED,
                        })];
                }
                customer_id = req.params.customer_id;
                return [4 /*yield*/, companyCustomerRepository.findCustomerById(customer_id)];
            case 1:
                customer = _b.sent();
                if (!customer) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.CUSTOMER_NOT_FOUND,
                        })];
                }
                // Soft delete the customer
                customer.isDeleted = true;
                customer.deletedAt = new Date();
                customer.deletedBy = userId;
                return [4 /*yield*/, customer.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.CUSTOMER_DELETED,
                        data: { customerId: customer_id },
                    })];
            case 3:
                error_5 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_5 instanceof Error ? error_5.message : String(error_5),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCustomer = deleteCustomer;
