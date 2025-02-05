"use strict";
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
exports.findCustomerById = exports.getCustomersByCompany = exports.FindCustomerByAll = exports.updateCustomerById = exports.createCustomer = exports.findCustomerByIdandCompany = void 0;
var customer_model_1 = __importDefault(require("../models/customer.model"));
// find customer data by customerId
// export const FindCustomerById = async (id: string) => { 
//   try {
//     const customer = Customer.findById(id).populate({
//       path: "company",
//       select: `companyName
//             alias
//             mobileNo
//             state
//             email
//             addresses
//             accountDetails
//             website
//             isDeleted
//             deletedAt
//             createdAt
//             updatedAt`,
//       model: "Company",
//     });
//     if (customer) return customer;
//   } catch (error) {
//     console.error("Error in findid", error);
//     throw error;
//   }
// };
//get customer by ID and company
var findCustomerByIdandCompany = function (customerId, options) { return __awaiter(void 0, void 0, void 0, function () {
    var company, customer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                company = options.company;
                return [4 /*yield*/, customer_model_1.default.findOne({
                        _id: customerId,
                        company: company,
                        isDeleted: false,
                    }).populate({
                        path: "company",
                        select: "companyName\n              alias\n              mobileNo\n              state\n              email\n              addresses\n              accountDetails\n              website\n              isDeleted\n              deletedAt\n              createdAt\n              updatedAt",
                        model: "Company",
                    })];
            case 1:
                customer = _a.sent();
                if (!customer) {
                    throw new Error("Customer not found");
                }
                return [2 /*return*/, customer];
            case 2:
                error_1 = _a.sent();
                console.error("Error in getCustomerById", error_1);
                throw error_1; // Re-throw the error for proper handling upstream
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCustomerByIdandCompany = findCustomerByIdandCompany;
// create new user
var createCustomer = function (customerDate) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customer = new customer_model_1.default(customerDate);
                return [4 /*yield*/, customer.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, customer];
            case 2:
                error_2 = _a.sent();
                console.error("Error in Create Customer");
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCustomer = createCustomer;
var updateCustomerById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (error) {
            console.error(" Error in undateCustomerByID");
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.updateCustomerById = updateCustomerById;
// check the customer already exist(pass name ,email,mobile)
var FindCustomerByAll = function (name, email, company, mobileNo) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nameExists, emailExists, mobileExists, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all([
                        name ? customer_model_1.default.findOne({ name: name, company: company }).lean() : Promise.resolve(null),
                        email
                            ? customer_model_1.default.findOne({ email: email, company: company }).lean()
                            : Promise.resolve(null),
                        mobileNo
                            ? customer_model_1.default.findOne({ mobileNo: mobileNo, company: company }).lean()
                            : Promise.resolve(null),
                    ])];
            case 1:
                _a = _b.sent(), nameExists = _a[0], emailExists = _a[1], mobileExists = _a[2];
                return [2 /*return*/, { nameExists: nameExists, emailExists: emailExists, mobileExists: mobileExists }];
            case 2:
                error_3 = _b.sent();
                console.error("Error in FindCustomerByAll ", error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.FindCustomerByAll = FindCustomerByAll;
// get customer detailes with companyId and checking it is active
var getCustomersByCompany = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var customers, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customer_model_1.default.find({
                        company: companyId,
                        isDeleted: false,
                    }).populate({
                        path: "company",
                        select: "companyName\n            alias\n            mobileNo\n            state\n            email\n            addresses\n            accountDetails\n            website\n            isDeleted\n            deletedAt\n            createdAt\n            updatedAt",
                        model: "Company",
                    })];
            case 1:
                customers = _a.sent();
                return [2 /*return*/, customers];
            case 2:
                error_4 = _a.sent();
                console.error("Error in getCustomersByCompany", error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCustomersByCompany = getCustomersByCompany;
// find customer data by customerId
var findCustomerById = function (customerId) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customer_model_1.default.findOne({
                        _id: customerId,
                        isDeleted: false,
                    }).populate({
                        path: "company",
                        select: "companyName\n                alias\n                mobileNo\n                state\n                email\n                addresses\n                accountDetails\n                website\n                isDeleted\n                deletedAt\n                createdAt\n                updatedAt",
                        model: "Company",
                    })];
            case 1:
                customer = _a.sent();
                if (!customer) {
                    throw new Error("Customer not found or has been deleted");
                }
                return [2 /*return*/, customer];
            case 2:
                error_5 = _a.sent();
                console.error("Error in findCustomerById", error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCustomerById = findCustomerById;
