import express from "express"

import * as QuotationController  from "../../controllers/CompanyUser/quotation"
import { validateRequest } from "../../middleware/Validation/validation"
import { quotationSchema } from "../../middleware/Validation/quotation/quotation.validate"



const router =  express.Router()

router.post('/create-quotation',validateRequest(quotationSchema),QuotationController.createQuotation)
router.get('/all-quotations',QuotationController.getAllCompaniesQuotation)
router.get("/:quotation_id",QuotationController.getQuotation)
router.put("/:quotation_id",QuotationController.updateQuation)
router.delete('/:quotation_id',QuotationController.deleteQuotation)

router.get("/:quotation_id/items",QuotationController.getQuotationItemsById)
router.put("/:quotation_id/items/:item_Id",QuotationController.updateQuotationItemById)
router.delete("/:quotation_id/items/:item_Id",QuotationController.deleteQuotationItemById)


router.get("/:quotation_id/pdf/generate",QuotationController.generateQuotationPdf)





export default router