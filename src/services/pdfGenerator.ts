import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";

export const generateQuotationPDF = async (quotation: any) => {
    try {
        const fonts = {
            Roboto: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new PdfPrinter(fonts);

        const docDefinition: any = {
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
                    text: "QUOTATION" , 
                    style: "documentTitle", 
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                
                // Quotation Info
                {
                    columns: [
                        {
                            width: '50%',
                            text: `J.No: ${quotation.jNo} `  ,
                            style: 'sectionHeader',
                            
                        },
                        {
                            width: '50%',
                            text: `Date: ${new Date(quotation.createdAt).toLocaleDateString()}`,
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
                                { text: "Bill To:", style: "sectionHeader",margin: [0, 0, 0, 8] },
                                { text: quotation.contractor?.name || '', style: 'boldText',margin: [0, 0, 0, 2]  },
                                { text: `Party: ${quotation.party}`,margin: [0, 0, 0, 2]  },
                                { text: `Email: ${quotation.email}`,margin: [0, 0, 0, 2]  }
                            ]
                        },
                        {
                            width: '50%',
                            stack: [
                                { text: "Details:", style: "sectionHeader" ,alignment: 'right',margin: [0, 0, 0, 8]},
                                { text: `Bill Quantity: ${quotation.billQty}`,alignment: 'right',margin: [0, 0, 0, 2]  },
                                { text: `Salesman: ${quotation.salesMan}`,alignment: 'right',margin: [0, 0, 0, 2]  }
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
                        body: [
                            [
                                { text: "Product", style: "tableHeader" },
                                { text: "Quantity", style: "tableHeader" },
                                { text: "Unit Price (₹)", style: "tableHeader" },
                                { text: "Total (₹)", style: "tableHeader" }
                            ],
                            ...(quotation.items?.length > 0 ? 
                                quotation.items.map((item: any) => [
                                    item.product?.name || 'N/A',
                                    { text: item.quantity?.toString() || '0', alignment: 'center' },
                                    { text: item.price.toFixed(2)|| 0, alignment: 'center' },
                                    { text: (item.quantity)  * (item.price).toFixed(2)|| 0, alignment: 'center' }
                                ]) 
                                : [[
                                    { text: '-', colSpan: 4, alignment: 'center' }, 
                                    '', '', ''
                                ]])
                        ],
                        // margin: [0, 0, 0, 15]
                    },
                    layout: {
                        hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0.5, // Horizontal lines
                        vLineWidth: () => 0.5, // Vertical lines
                        hLineColor: () => '#aaaaaa', // Horizontal line color
                        vLineColor: () => '#aaaaaa', // Vertical line color
                        paddingTop: (i: number) => (i === 0) ? 5 : 2, // Padding for header row
                        paddingBottom: (i: number) => (i === 0) ? 5 : 2, // Padding for header row
                        
                        
                    }
                },
        
                // Total Section
                {
                    stack: [
                        {
                            columns: [
                                { text: "Gross Amount:", style: 'boldText',alignment: 'right' },
                                { text: quotation.grossAmount?.toFixed(2) || 0, alignment: 'right' }
                            ],
                            margin: [0, 10, 10, 5]
                        },
                        {
                            columns: [
                                { text: `Discount (${quotation.discPercentage || 0}%):`, style: 'boldText', alignment: 'right' },
                                { text: quotation.discPercentage.toFixed(2)||0, alignment: 'right' }
                            ],
                            margin: [0, 0, 10, 5]
                        },
                        {
                            columns: [
                                { text: "Net Amount:", style: 'boldText' ,alignment: 'right' },
                                { 
                                    text: quotation.netAmount?.toFixed(2)||0, 
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
        // Create PDF document
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        // // Directory handling and file writing remains the same
        // const uploadsDir = path.join(__dirname, '../uploads');
        // if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
        
        // const quotationsDir = path.join(uploadsDir, 'quotations');
        // if (!fs.existsSync(quotationsDir)) fs.mkdirSync(quotationsDir, { recursive: true });

        // const filename = `quotation_${quotation._id}_${Date.now()}.pdf`;
        // const filePath = path.join(quotationsDir, filename);

        // return new Promise((resolve, reject) => {
        //     const writeStream = fs.createWriteStream(filePath);
        //     writeStream.on('finish', () => resolve({ 
        //         success: true, 
        //         filepath: filePath, 
        //         filename: filename 
        //     }));
        //     writeStream.on('error', reject);
        //     pdfDoc.pipe(writeStream);
        //     pdfDoc.end();
        // });

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};