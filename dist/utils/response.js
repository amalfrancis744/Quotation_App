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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobleResponse = void 0;
var Constant = __importStar(require("./constant"));
var Response = /** @class */ (function () {
    function Response() {
        this.statusCode = Constant.STATUS_CODE.OK;
        this.message = 'Request Success';
        this.errorMessage = 'Something went wrong, Kindly try again';
    }
    Response.prototype.success = function (_a) {
        var res = _a.res, headers = _a.headers, status = _a.status, msg = _a.msg, data = _a.data;
        if (headers) {
            res.set(headers);
        }
        if (!data) {
            this.statusCode = Constant.STATUS_CODE.NO_CONTENT;
        }
        res.status(status || this.statusCode).json({
            msg: msg || this.message,
            data: data
        });
    };
    Response.prototype.error = function (_a) {
        var res = _a.res, headers = _a.headers, status = _a.status, msg = _a.msg, data = _a.data;
        if (headers) {
            res.set(headers);
        }
        res.status(status || 400).json({
            msg: msg || this.errorMessage,
            data: data
        });
    };
    return Response;
}());
var GlobleResponse = new Response();
exports.GlobleResponse = GlobleResponse;
