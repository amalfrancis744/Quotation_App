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
exports.resetPassword = exports.verifyUrl = exports.forgotPassword = exports.loginCompanyUser = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var userRepository = __importStar(require("../../repository/user.Repository"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var dotenv_1 = __importDefault(require("dotenv"));
var resetPassword_model_1 = __importDefault(require("../../models/resetPassword.model"));
var nodemailer_1 = require("../../services/nodemailer");
dotenv_1.default.config();
// for company user login
var loginCompanyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, checkPassword, SCERET_KEY, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_CREDENTIALS,
                        })];
                }
                return [4 /*yield*/, userRepository.findUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_EMAIL,
                        })];
                }
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                checkPassword = _b.sent();
                if (!checkPassword) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_PASSWORD,
                        })];
                }
                _b.label = 3;
            case 3:
                SCERET_KEY = process.env.USER_JWT_SECRET || "mysceretkey";
                token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    userId: user._id,
                }, SCERET_KEY, {
                    expiresIn: "1h",
                });
                // const userResponse = {
                //   _id: user._id,
                //   email: user.email,
                // };
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        data: {
                            // user: userResponse,
                            token: token,
                        },
                        msg: constant_1.INFO_MSGS.SUCCESSFUL_LOGIN,
                    })];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_1 instanceof Error ? error_1.message : String(error_1),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginCompanyUser = loginCompanyUser;
// forgot password
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, resetToken, tokenHex, expireTime, tokenDetail, url, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                email = req.body.email;
                if (!email) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_CREDENTIALS,
                        })];
                }
                // Convert email to lowercase for consistency
                email = email.toLowerCase();
                return [4 /*yield*/, userRepository.findUserByEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.USER_NOT_FOUND,
                        })];
                }
                // delete previously  generated token for user
                return [4 /*yield*/, userRepository.deleteToken(user._id)];
            case 2:
                // delete previously  generated token for user
                _a.sent();
                resetToken = crypto_1.default.randomBytes(32).toString("hex");
                return [4 /*yield*/, bcrypt_1.default.hash(resetToken, 10)];
            case 3:
                tokenHex = _a.sent();
                expireTime = new Date().getTime() + 10 * 60 * 1000;
                return [4 /*yield*/, userRepository.createResetPasswordToken({
                        userId: user._id,
                        resetToken: tokenHex,
                        expiresAt: expireTime,
                    })];
            case 4:
                tokenDetail = _a.sent();
                url = "".concat(process.env.BACKEND_URL, "/auth/verify-token?id=").concat(tokenDetail.userId, "&token=").concat(tokenDetail.resetToken);
                // console.log("reset url==>", url);
                // Send reset password email to user
                return [4 /*yield*/, (0, nodemailer_1.forgetPasswordMail)(url, email)];
            case 5:
                // console.log("reset url==>", url);
                // Send reset password email to user
                _a.sent();
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.RESET_EMAIL,
                    })];
            case 6:
                error_2 = _a.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_2 instanceof Error ? error_2.message : String(error_2),
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var verifyUrl = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, tokenExist, currentTime, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, id = _a.id, token = _a.token;
                return [4 /*yield*/, resetPassword_model_1.default.findOne({
                        userId: id,
                        resetToken: token,
                    })];
            case 1:
                tokenExist = _b.sent();
                if (!tokenExist) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_TOKEN,
                        })];
                }
                currentTime = new Date().getTime();
                if (new Date(tokenExist.expiresAt).getTime() < currentTime) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.TOKEN_EXPIRED,
                        })];
                }
                return [2 /*return*/, response_1.GlobleResponse.success({
                        res: res,
                        status: http_status_1.default.OK,
                        msg: constant_1.INFO_MSGS.TOKEN_VALID,
                    })];
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
exports.verifyUrl = verifyUrl;
// Reset password
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, newPassword, user, tokenExist, passswordHex, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, id = _a.id, token = _a.token, newPassword = _a.newPassword;
                if (!id || !token || !newPassword) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_CREDENTIALS,
                        })];
                }
                return [4 /*yield*/, userRepository.findUserById(id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.NOT_FOUND,
                            msg: constant_1.ERROR_MSGS.USER_NOT_FOUND,
                        })];
                }
                return [4 /*yield*/, resetPassword_model_1.default.findOne({
                        userId: id,
                        resetToken: token,
                    })];
            case 2:
                tokenExist = _b.sent();
                if (!tokenExist) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: constant_1.ERROR_MSGS.INVALID_TOKEN,
                        })];
                }
                if (!tokenExist) return [3 /*break*/, 6];
                return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 10)];
            case 3:
                passswordHex = _b.sent();
                return [4 /*yield*/, userRepository.updateById(id, { password: passswordHex })];
            case 4:
                _b.sent();
                return [4 /*yield*/, resetPassword_model_1.default.deleteOne({ userId: id, resetToken: token })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, response_1.GlobleResponse.success({
                    res: res,
                    status: http_status_1.default.OK,
                    msg: constant_1.INFO_MSGS.PASSWORD_CHANGED,
                })];
            case 7:
                error_4 = _b.sent();
                return [2 /*return*/, response_1.GlobleResponse.error({
                        res: res,
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        msg: error_4 instanceof Error ? error_4.message : String(error_4),
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
