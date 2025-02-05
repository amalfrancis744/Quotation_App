"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var DBconnection_1 = __importDefault(require("./connection/DBconnection"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// setup cors
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use("/api", routes_1.apiRouter);
app.use((0, cors_1.default)(corsOptions));
// Basic route
app.get("/", function (req, res) {
    res.send("Hello welcome to backend!");
});
// db connection
(0, DBconnection_1.default)();
// Start the server
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
