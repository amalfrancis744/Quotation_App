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
exports.loginAdmin = exports.registerAdmin = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var adminRepository = __importStar(require("../../repository/admin.Repository"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// for admin creation routes
var registerAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, existingAdmin, hashedPassword, obj, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, adminRepository.findAdminByUsername(username)];
            case 1:
                existingAdmin = _b.sent();
                if (existingAdmin) {
                    // Use the GlobleResponse for consistent error handling
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.CONFLICT, // Use 409 Conflict status
                            msg: constant_1.ERROR_MSGS.EMAIL_EXISTS,
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, adminRepository.createAdmin({
                        username: username,
                        password: hashedPassword,
                    })];
            case 3:
                _b.sent();
                obj = {
                    res: res,
                    status: http_status_1.default.CREATED,
                    msg: constant_1.INFO_MSGS.SUCCESSFUL_REGISTER,
                    data: { username: username },
                };
                return [2 /*return*/, response_1.GlobleResponse.success(obj)];
            case 4:
                error_1 = _b.sent();
                // Catch and handle any unexpected errors
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_1 instanceof Error ? error_1.message : String(error_1),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerAdmin = registerAdmin;
// for admin login
var loginAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, admin, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, adminRepository.findAdminByUsername(username)];
            case 1:
                admin = _b.sent();
                if (!admin) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.USER_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, admin.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.UNAUTHORIZED,
                            msg: constant_1.ERROR_MSGS.INVALID_PASS,
                        })];
                }
                token = jsonwebtoken_1.default.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
                });
                // Successful login response
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.SUCCESSFUL_LOGIN,
                        data: { token: token },
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
exports.loginAdmin = loginAdmin;
