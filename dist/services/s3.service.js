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
exports.S3Service = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var s3_config_1 = require("../config/s3.config");
var path_1 = __importDefault(require("path"));
var crypto_1 = require("crypto");
var S3Service = /** @class */ (function () {
    function S3Service() {
        this.s3Client = s3_config_1.s3Client;
        this.bucket = process.env.AWS_BUCKET_NAME || "";
    }
    S3Service.prototype.getSignedUrl = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        command = new client_s3_1.GetObjectCommand({
                            Bucket: this.bucket,
                            Key: key,
                        });
                        return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error generating signed URL:", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    S3Service.prototype.deleteFile = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        command = new client_s3_1.DeleteObjectCommand({
                            Bucket: this.bucket,
                            Key: key,
                        });
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error deleting file:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Generate unique filename
    S3Service.prototype.generateFileName = function (file) {
        var fileExtension = path_1.default.extname(file.originalname);
        return "".concat((0, crypto_1.randomUUID)()).concat(fileExtension);
    };
    S3Service.prototype.updateFile = function (oldKey, file) {
        return __awaiter(this, void 0, void 0, function () {
            var newFileName, key, command, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!oldKey) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteFile(oldKey)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        newFileName = this.generateFileName(file);
                        key = "products/".concat(newFileName);
                        command = new client_s3_1.PutObjectCommand({
                            Bucket: this.bucket,
                            Key: key,
                            Body: file.buffer,
                            ContentType: file.mimetype, // Use the MIME type from the file object
                            Metadata: {
                                fieldName: file.fieldname,
                            },
                        });
                        // Upload new file
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 3:
                        // Upload new file
                        _a.sent();
                        // Return the new file key
                        return [2 /*return*/, key];
                    case 4:
                        error_3 = _a.sent();
                        console.error("Error updating file:", error_3);
                        throw error_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return S3Service;
}());
exports.S3Service = S3Service;
