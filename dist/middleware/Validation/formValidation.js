"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMemory = void 0;
var multer_1 = __importDefault(require("multer"));
var constant_1 = require("../../utils/constant");
var memoryStorage = multer_1.default.memoryStorage();
var ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// File filter function
var fileFilter = function (req, file, cb) {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(new Error(constant_1.ERROR_MSGS.INVALID_FILE_TYPE), false);
    }
    cb(null, true);
};
exports.uploadMemory = (0, multer_1.default)({
    storage: memoryStorage,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: 1,
    },
    fileFilter: fileFilter,
});
