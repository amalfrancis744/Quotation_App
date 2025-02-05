"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ResetPasswordSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
var ResetPassword = mongoose_1.default.model("ResetPassword", ResetPasswordSchema);
exports.default = ResetPassword;
