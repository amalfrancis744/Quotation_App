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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuotationPDF = void 0;
var pdfmake_1 = __importDefault(require("pdfmake"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var generateQuotationPDF = function (quotation) { return __awaiter(void 0, void 0, void 0, function () {
    var fonts, printer, docDefinition, pdfDoc_1, uploadsDir, quotationsDir, filename_1, filePath_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        try {
            fonts = {
                Roboto: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                }
            };
            printer = new pdfmake_1.default(fonts);
            docDefinition = {
                pageSize: 'A4',
                pageMargins: [40, 60, 40, 60],
                defaultStyle: {
                    font: 'Roboto',
                    fontSize: 10,
                },
                background: [
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: 0,
                                w: 595.28, // A4 width in points (1 point = 1/72 inch)
                                h: 841.89, // A4 height in points
                                lineWidth: 1,
                                lineColor: '#aaaaaa',
                                border: [1, 1, 1, 1], // Border on all four sides
                            }
                        ]
                    }
                ],
                content: [
                    // Header Section
                    {
                        text: "QUOTATION",
                        style: "documentTitle",
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    },
                    // Quotation Info
                    {
                        columns: [
                            {
                                width: '50%',
                                text: "J.No: ".concat(quotation.jNo, " "),
                                style: 'sectionHeader',
                            },
                            {
                                width: '50%',
                                text: "Date: ".concat(new Date(quotation.createdAt).toLocaleDateString()),
                                alignment: 'right',
                                style: 'sectionHeader'
                            }
                        ],
                        margin: [0, 0, 0, 15]
                    },
                    // Company and Client Details
                    {
                        columns: [
                            {
                                width: '50%',
                                stack: [
                                    { text: "Bill To:", style: "sectionHeader", margin: [0, 0, 0, 8] },
                                    { text: ((_a = quotation.contractor) === null || _a === void 0 ? void 0 : _a.name) || '', style: 'boldText', margin: [0, 0, 0, 2] },
                                    { text: "Party: ".concat(quotation.party), margin: [0, 0, 0, 2] },
                                    { text: "Email: ".concat(quotation.email), margin: [0, 0, 0, 2] }
                                ]
                            },
                            {
                                width: '50%',
                                stack: [
                                    { text: "Details:", style: "sectionHeader", alignment: 'right', margin: [0, 0, 0, 8] },
                                    { text: "Bill Quantity: ".concat(quotation.billQty), alignment: 'right', margin: [0, 0, 0, 2] },
                                    { text: "Salesman: ".concat(quotation.salesMan), alignment: 'right', margin: [0, 0, 0, 2] }
                                ]
                            }
                        ],
                        margin: [0, 0, 0, 30]
                    },
                    // Items Table
                    {
                        text: "ITEMS DETAILS",
                        style: "sectionHeader",
                        margin: [0, 0, 0, 10]
                    },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '15%', '20%', '20%'],
                            body: __spreadArray([
                                [
                                    { text: "Product", style: "tableHeader" },
                                    { text: "Quantity", style: "tableHeader" },
                                    { text: "Unit Price (₹)", style: "tableHeader" },
                                    { text: "Total (₹)", style: "tableHeader" }
                                ]
                            ], (((_b = quotation.items) === null || _b === void 0 ? void 0 : _b.length) > 0 ?
                                quotation.items.map(function (item) {
                                    var _a, _b;
                                    return [
                                        ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || 'N/A',
                                        { text: ((_b = item.quantity) === null || _b === void 0 ? void 0 : _b.toString()) || '0', alignment: 'center' },
                                        { text: item.price.toFixed(2) || 0, alignment: 'center' },
                                        { text: (item.quantity) * (item.price).toFixed(2) || 0, alignment: 'center' }
                                    ];
                                })
                                : [[
                                        { text: '-', colSpan: 4, alignment: 'center' },
                                        '', '', ''
                                    ]]), true),
                            // margin: [0, 0, 0, 15]
                        },
                        layout: {
                            hLineWidth: function (i, node) { return (i === 0 || i === node.table.body.length) ? 1 : 0.5; }, // Horizontal lines
                            vLineWidth: function () { return 0.5; }, // Vertical lines
                            hLineColor: function () { return '#aaaaaa'; }, // Horizontal line color
                            vLineColor: function () { return '#aaaaaa'; }, // Vertical line color
                            paddingTop: function (i) { return (i === 0) ? 5 : 2; }, // Padding for header row
                            paddingBottom: function (i) { return (i === 0) ? 5 : 2; }, // Padding for header row
                        }
                    },
                    // Total Section
                    {
                        stack: [
                            {
                                columns: [
                                    { text: "Gross Amount:", style: 'boldText', alignment: 'right' },
                                    { text: ((_c = quotation.grossAmount) === null || _c === void 0 ? void 0 : _c.toFixed(2)) || 0, alignment: 'right' }
                                ],
                                margin: [0, 10, 10, 5]
                            },
                            {
                                columns: [
                                    { text: "Discount (".concat(quotation.discPercentage || 0, "%):"), style: 'boldText', alignment: 'right' },
                                    { text: quotation.discPercentage.toFixed(2) || 0, alignment: 'right' }
                                ],
                                margin: [0, 0, 10, 5]
                            },
                            {
                                columns: [
                                    { text: "Net Amount:", style: 'boldText', alignment: 'right' },
                                    {
                                        text: ((_d = quotation.netAmount) === null || _d === void 0 ? void 0 : _d.toFixed(2)) || 0,
                                        alignment: 'right',
                                        style: 'totalAmount'
                                    }
                                ],
                                margin: [0, 0, 10, 20]
                            }
                        ]
                    },
                    // Terms and Conditions
                    {
                        text: "Terms & Conditions:",
                        style: "sectionHeader",
                        margin: [0, 20, 0, 5]
                    },
                    {
                        ul: [
                            'Prices valid for 30 days',
                            'Payment due within 15 days of invoice date',
                            'Goods once sold will not be taken back',
                        ],
                        margin: [0, 0, 0, 30]
                    }
                ],
                styles: {
                    documentTitle: {
                        fontSize: 24,
                        bold: true,
                        color: '#2c5392'
                    },
                    sectionHeader: {
                        fontSize: 12,
                        bold: true,
                        color: '#444444'
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 11,
                        color: '#ffffff',
                        fillColor: '#2c5392',
                        alignment: 'center'
                    },
                    boldText: {
                        bold: true
                    },
                    totalAmount: {
                        bold: true,
                        fontSize: 12,
                        color: '#2c5392'
                    },
                    label: {
                        fontSize: 11,
                        color: '#666666'
                    }
                }
            };
            pdfDoc_1 = printer.createPdfKitDocument(docDefinition);
            uploadsDir = path_1.default.join(__dirname, '../uploads');
            if (!fs_1.default.existsSync(uploadsDir))
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            quotationsDir = path_1.default.join(uploadsDir, 'quotations');
            if (!fs_1.default.existsSync(quotationsDir))
                fs_1.default.mkdirSync(quotationsDir, { recursive: true });
            filename_1 = "quotation_".concat(quotation._id, "_").concat(Date.now(), ".pdf");
            filePath_1 = path_1.default.join(quotationsDir, filename_1);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var writeStream = fs_1.default.createWriteStream(filePath_1);
                    writeStream.on('finish', function () { return resolve({
                        success: true,
                        filepath: filePath_1,
                        filename: filename_1
                    }); });
                    writeStream.on('error', reject);
                    pdfDoc_1.pipe(writeStream);
                    pdfDoc_1.end();
                })];
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.generateQuotationPDF = generateQuotationPDF;
