"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidators = exports.validateRequest = void 0;
var zod_1 = require("zod");
var response_1 = require("../../utils/response");
var http_status_1 = __importDefault(require("http-status"));
var constant_1 = require("../../utils/constant");
var mongoose_1 = __importDefault(require("mongoose"));
var validateRequest = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.query,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                var errors = error.errors.map(function (err) { return ({
                    field: err.path.join("."),
                    message: err.message,
                }); });
                return response_1.GlobleResponse.error({
                    res: res,
                    status: http_status_1.default.BAD_REQUEST,
                    msg: constant_1.ERROR_MSGS.VALIDATION_ERROR,
                    data: errors,
                });
            }
            response_1.GlobleResponse.error({
                res: res,
                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                msg: constant_1.ERROR_MSGS.INTERNAL_ERROR,
            });
        }
    };
};
exports.validateRequest = validateRequest;
// Common validators that can be reused across schemas
exports.commonValidators = {
    id: function (message) {
        if (message === void 0) { message = constant_1.ERROR_MSGS.INVALID_ID; }
        return zod_1.z.string().min(1, "Company id is required").refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }, message);
    },
};
