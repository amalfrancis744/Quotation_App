"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = exports.handleUploadError = exports.uploadS3 = exports.generateFileName = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var path_1 = __importDefault(require("path"));
var crypto_1 = require("crypto");
var s3_config_1 = require("../../config/s3.config");
var constant_1 = require("../../utils/constant");
// Allowed file types and size
var ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// File filter function
var fileFilter = function (req, file, cb) {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(new Error(constant_1.ERROR_MSGS.INVALID_FILE_TYPE), false);
    }
    cb(null, true);
};
// Generate unique filename
var generateFileName = function (file) {
    var fileExtension = path_1.default.extname(file.originalname);
    return "".concat((0, crypto_1.randomUUID)()).concat(fileExtension);
};
exports.generateFileName = generateFileName;
// S3 upload configuration
exports.uploadS3 = (0, multer_1.default)({
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: 1
    },
    fileFilter: fileFilter,
    storage: (0, multer_s3_1.default)({
        s3: s3_config_1.s3Client,
        bucket: process.env.AWS_BUCKET_NAME || "",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var fileName = (0, exports.generateFileName)(file);
            var folderPath = "products";
            cb(null, "".concat(folderPath, "/").concat(fileName));
        },
    }),
});
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var handleUploadError = function (error, req, res, next) {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            response_1.GlobleResponse.error({
                msg: constant_1.ERROR_MSGS.FILE_SIZE_EXCEEDED,
                res: res,
                status: http_status_1.default.INTERNAL_SERVER_ERROR
            });
            return;
        }
        res.status(400).json({ res: false, message: error.message });
        return;
    }
    if (error) {
        res.status(400).json({ res: false, message: error.message });
        return;
    }
    next();
};
exports.handleUploadError = handleUploadError;
// Upload middleware for single file
exports.uploadSingle = exports.uploadS3.single("file");
