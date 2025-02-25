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
exports.deleteQuotationItem = exports.updateQuotationItem = exports.checkQuotationItemExists = exports.updateById = exports.findQuotationById = exports.findQuotationsByCompany = exports.findWithFeild = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var quotation_model_1 = __importDefault(require("../models/quotation.model"));
// Repository function to check if JNo exists
var findWithFeild = function (jNo) { return __awaiter(void 0, void 0, void 0, function () {
    var quotation, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.findOne({
                        jNo: jNo,
                        isDeleted: false
                    })];
            case 1:
                quotation = _a.sent();
                return [2 /*return*/, quotation];
            case 2:
                error_1 = _a.sent();
                console.error("Error in findWithFeild:", error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findWithFeild = findWithFeild;
var findQuotationsByCompany = function (company) { return __awaiter(void 0, void 0, void 0, function () {
    var quotations, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.find({ company: company, isDeleted: false })];
            case 1:
                quotations = _a.sent();
                return [2 /*return*/, quotations];
            case 2:
                error_2 = _a.sent();
                console.error("Error in findQuotationsByCompany", error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findQuotationsByCompany = findQuotationsByCompany;
var findQuotationById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var quotation, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.findOne({ _id: id, isDeleted: false }).populate([
                        {
                            path: 'contractor',
                            select: 'name email phone',
                        },
                        {
                            path: 'company',
                            select: 'companyName ',
                        },
                        {
                            path: 'items.product',
                            select: 'name price description',
                        },
                    ])];
            case 1:
                quotation = _a.sent();
                return [2 /*return*/, quotation];
            case 2:
                error_3 = _a.sent();
                console.error('Error in findQuotationById:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findQuotationById = findQuotationById;
var updateById = function (id, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedQuotation, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true,
                        runValidators: true })];
            case 1:
                updatedQuotation = _a.sent();
                if (!updatedQuotation) {
                    throw new Error('Quotation not found');
                }
                return [2 /*return*/, updatedQuotation];
            case 2:
                error_4 = _a.sent();
                console.error("Error in updateById", error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateById = updateById;
// check the quotation and items exists in the collection
var checkQuotationItemExists = function (quotationId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
    var quotation, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Validate if the IDs are valid MongoDB ObjectIDs
                if (!mongoose_1.default.Types.ObjectId.isValid(quotationId) || !mongoose_1.default.Types.ObjectId.isValid(itemId)) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, quotation_model_1.default.findOne({
                        _id: quotationId,
                        isDeleted: false,
                        'items._id': itemId
                    })];
            case 1:
                quotation = _a.sent();
                // Return true if quotation with the specific item was found, false otherwise
                return [2 /*return*/, quotation];
            case 2:
                error_5 = _a.sent();
                console.error("Error in checkQuotationItemExists:", error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkQuotationItemExists = checkQuotationItemExists;
var updateQuotationItem = function (item_id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var updateItem, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.findOneAndUpdate({ "items._id": item_id }, // Find the document where the items array contains an item with the given _id
                    {
                        $set: {
                            "items.$.product": data.product_id, // Update product
                            "items.$.price": data.price, // Update price
                            "items.$.quantity": data.quantity, // Update quantity
                        },
                    }, { new: true } // Return the updated document
                    )];
            case 1:
                updateItem = _a.sent();
                if (!updateItem) {
                    throw new Error("Quotation item not found");
                }
                return [2 /*return*/, updateItem]; // Return the updated document
            case 2:
                error_6 = _a.sent();
                console.error("Error found in the updateQuotationItem:", error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateQuotationItem = updateQuotationItem;
var deleteQuotationItem = function (item_id) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedQuotation, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quotation_model_1.default.findOneAndUpdate({ "items._id": item_id }, // Find the document containing the item
                    { $pull: { items: { _id: item_id } } }, // Remove the item from the array
                    { new: true } // Return the updated document
                    )];
            case 1:
                updatedQuotation = _a.sent();
                return [2 /*return*/, updatedQuotation];
            case 2:
                error_7 = _a.sent();
                console.error("Error in deleteQuotationItem:", error_7);
                throw error_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteQuotationItem = deleteQuotationItem;
