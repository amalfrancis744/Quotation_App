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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProductUrl = void 0;
var s3_service_1 = require("../services/s3.service");
var userProductRepository = __importStar(require("../repository/product.Repository"));
var isUrlExpired = function (urlString) {
    try {
        var url = new URL(urlString);
        var expiresIn = url.searchParams.get("X-Amz-Expires");
        var dateString = url.searchParams.get("X-Amz-Date");
        if (!expiresIn || !dateString) {
            return true;
        }
        // Convert AWS date format (YYYYMMDDTHHMMSSZ) to ISO format
        var creationDate = dateString.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z");
        // determining  expiration timestamp
        var creationTimestamp = Math.floor(Date.parse(creationDate) / 1000);
        var expirationTimestamp = creationTimestamp + parseInt(expiresIn, 10);
        var currentTimestamp = Math.floor(Date.now() / 1000);
        // console.log(currentTimestamp,expirationTimestamp)
        return currentTimestamp > expirationTimestamp;
    }
    catch (error) {
        console.error("Error checking URL expiration: ".concat(error));
        return true;
    }
};
var processProductUrl = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var updatePromises;
    return __generator(this, function (_a) {
        updatePromises = product.map(function (product) { return __awaiter(void 0, void 0, void 0, function () {
            var s3Service, newUrl, error_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!((Array.isArray(product) && ((_b = (_a = product === null || product === void 0 ? void 0 : product[0]) === null || _a === void 0 ? void 0 : _a.productImage) === null || _b === void 0 ? void 0 : _b.imageUrl) && isUrlExpired(product[0].productImage.imageUrl)) ||
                            (!Array.isArray(product) && ((_c = product === null || product === void 0 ? void 0 : product.productImage) === null || _c === void 0 ? void 0 : _c.imageUrl) && isUrlExpired(product.productImage.imageUrl)))) return [3 /*break*/, 5];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        s3Service = new s3_service_1.S3Service();
                        return [4 /*yield*/, s3Service.getSignedUrl(product === null || product === void 0 ? void 0 : product[0].productImage.key)];
                    case 2:
                        newUrl = _d.sent();
                        // Update product in database
                        return [4 /*yield*/, userProductRepository.UpdateById(product._id, {
                                "productImage.imageUrl": newUrl,
                            })];
                    case 3:
                        // Update product in database
                        _d.sent();
                        // Update URL in current product object
                        product.productImage.imageUrl = newUrl;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _d.sent();
                        console.error("Error updating URL for product ".concat(product._id, ":").concat(error_1));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, product];
                }
            });
        }); });
        return [2 /*return*/, Promise.all(updatePromises)];
    });
}); };
exports.processProductUrl = processProductUrl;
