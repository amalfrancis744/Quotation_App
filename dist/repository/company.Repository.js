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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdAndUpdate = exports.findCompayByCompanyNameAndSame = exports.findEmailByEmailCompanyId = exports.findCompanyById = exports.findEmailByCompany = exports.findCompanyNameByCompany = exports.findAllCompanies = void 0;
var comapny_model_1 = require("../models/comapny.model");
// Retrieve all companies from the database
var findAllCompanies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allCompany, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.find({ isDeleted: false })];
            case 1:
                allCompany = _a.sent();
                return [2 /*return*/, allCompany];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findAllCompanies = findAllCompanies;
// Find a company by exact company name (case-insensitive)
var findCompanyNameByCompany = function (companyName) { return __awaiter(void 0, void 0, void 0, function () {
    var company, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findOne({
                        companyName: {
                            $regex: new RegExp("^".concat(companyName, "$"), "i"),
                        },
                        isDeleted: false,
                    })];
            case 1:
                company = _a.sent();
                return [2 /*return*/, company];
            case 2:
                error_2 = _a.sent();
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCompanyNameByCompany = findCompanyNameByCompany;
// Find a company by email address
var findEmailByCompany = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var company, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findOne({ email: email, isDeleted: false })];
            case 1:
                company = _a.sent();
                return [2 /*return*/, company];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findEmailByCompany = findEmailByCompany;
// Find a company by its MongoDB ObjectId
var findCompanyById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var company, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findOne({ _id: id, isDeleted: false })];
            case 1:
                company = _a.sent();
                return [2 /*return*/, company];
            case 2:
                error_4 = _a.sent();
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCompanyById = findCompanyById;
// Find a company by email, excluding a specific company ID
var findEmailByEmailCompanyId = function (normalizedEmail, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var getEmail, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findOne({
                        email: normalizedEmail,
                        _id: { $ne: companyId },
                    })];
            case 1:
                getEmail = _a.sent();
                return [2 /*return*/, getEmail];
            case 2:
                error_5 = _a.sent();
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findEmailByEmailCompanyId = findEmailByEmailCompanyId;
// Find a company by name, excluding a specific company ID
var findCompayByCompanyNameAndSame = function (companyName, companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var company, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findOne({
                        companyName: companyName,
                        _id: { $ne: companyId },
                    })];
            case 1:
                company = _a.sent();
                return [2 /*return*/, company];
            case 2:
                error_6 = _a.sent();
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findCompayByCompanyNameAndSame = findCompayByCompanyNameAndSame;
// Update a company by ID with new data
var findByIdAndUpdate = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCompany, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comapny_model_1.Company.findByIdAndUpdate(id, data, {
                        new: true,
                        runValidators: true,
                    })];
            case 1:
                updatedCompany = _a.sent();
                return [2 /*return*/, updatedCompany];
            case 2:
                error_7 = _a.sent();
                console.error("Error in findByIdAndUpdate:", error_7);
                throw error_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findByIdAndUpdate = findByIdAndUpdate;
