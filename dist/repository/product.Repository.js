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
exports.UpdateById = exports.CountAllProducts = exports.findAll = exports.findByIdAndPopulate = exports.InsertData = exports.findOneByFeild = void 0;
var product_model_1 = __importDefault(require("../models/product.model"));
// get product data with perticular feilds 
var findOneByFeild = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_model_1.default.findOne(data)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findOneByFeild = findOneByFeild;
// Inser new product data
var InsertData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product = new product_model_1.default(data);
                return [4 /*yield*/, product.save()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.InsertData = InsertData;
// get product data with productId and also populating company data also
var findByIdAndPopulate = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_model_1.default.findById(id).populate("company")];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findByIdAndPopulate = findByIdAndPopulate;
// get all compaies product with some filtered factors
var findAll = function (filters, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, skip, _c, limit, _d, sort, allProducts, error_4;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                _a = options || {}, _b = _a.skip, skip = _b === void 0 ? 0 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.sort, sort = _d === void 0 ? {} : _d;
                return [4 /*yield*/, product_model_1.default.find(filters)
                        .skip(skip)
                        .limit(limit)
                        .sort(sort)
                        .populate({
                        path: "company",
                        select: "companyName\n        alias\n        mobileNo\n        state\n        email\n        addresses\n        accountDetails\n        website\n        isDeleted\n        deletedAt\n        createdAt\n        updatedAt",
                        model: "Company",
                    })];
            case 1:
                allProducts = _e.sent();
                return [2 /*return*/, allProducts];
            case 2:
                error_4 = _e.sent();
                console.error("Error in findAll:", error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findAll = findAll;
// count the product documents 
var CountAllProducts = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var allCount, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_model_1.default.countDocuments(data)];
            case 1:
                allCount = _a.sent();
                return [2 /*return*/, allCount];
            case 2:
                error_5 = _a.sent();
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CountAllProducts = CountAllProducts;
// update product by Id. 
var UpdateById = function (id, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedProduct, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_model_1.default.findByIdAndUpdate(id, updateData, {
                        new: true,
                        runValidators: true,
                    })];
            case 1:
                updatedProduct = _a.sent();
                if (!updatedProduct) {
                    throw new Error("Product with ID ".concat(id, " not found"));
                }
                return [2 /*return*/, updatedProduct];
            case 2:
                error_6 = _a.sent();
                console.error("Error in UpdateById:", error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateById = UpdateById;
