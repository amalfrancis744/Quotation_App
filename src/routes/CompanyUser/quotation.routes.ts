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





export default router