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
exports.handleUploadError = exports.uploadToS3 = exports.generateFileName = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var crypto_1 = require("crypto");
var s3_config_1 = require("../../config/s3.config");
var client_s3_1 = require("@aws-sdk/client-s3");
var constant_1 = require("../../utils/constant");
// Generate unique filename
var generateFileName = function (file) {
    var fileExtension = path_1.default.extname(file.originalname);
    return "".concat((0, crypto_1.randomUUID)()).concat(fileExtension);
};
exports.generateFileName = generateFileName;
// Generate S3 public URL
var getS3Location = function (bucket, region, key) {
    return "https://".concat(bucket, ".s3.").concat(region, ".amazonaws.com/").concat(key);
};
// Middleware to handle S3 upload
var uploadToS3 = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, folderPath, key, bucket, region, command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file) {
                    return [2 /*return*/, response_1.GlobleResponse.error({
                            res: res,
                            status: http_status_1.default.BAD_REQUEST,
                            msg: "No file uploaded",
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                fileName = (0, exports.generateFileName)(req.file);
                folderPath = "products";
                key = "".concat(folderPath, "/").concat(fileName);
                bucket = process.env.AWS_BUCKET_NAME;
                region = process.env.AWS_REGION || "us-east-1";
                command = new client_s3_1.PutObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                    Metadata: {
                        fieldName: req.file.fieldname,
                    },
                });
                return [4 /*yield*/, s3_config_1.s3Client.send(command)];
            case 2:
                _a.sent();
                // Enrich req.file with S3 metadata
                Object.assign(req.file, {
                    key: key,
                    location: getS3Location(bucket, region, key),
                    bucket: bucket,
                    acl: "public-read",
                    metadata: {
                        fieldName: req.file.fieldname,
                    },
                });
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadToS3 = uploadToS3;
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var handleUploadError = function (error, req, res, next) {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            response_1.GlobleResponse.error({
                msg: constant_1.ERROR_MSGS.FILE_SIZE_EXCEEDED,
                res: res,
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
            });
            return;
        }
        res.status(400).json({ msg: error.message });
        return;
    }
    if (error) {
        res.status(400).json({ msg: error.message });
        return;
    }
    next();
};
exports.handleUploadError = handleUploadError;
// Upload middleware for single file
