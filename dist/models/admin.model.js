"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var AdminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// Add a transform to rename `_id` to `id` for adminDetails
AdminSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
exports.Admin = mongoose_1.default.model("Admin", AdminSchema);
