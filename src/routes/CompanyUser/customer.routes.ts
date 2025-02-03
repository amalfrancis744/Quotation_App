import express, { Router } from "express";
import  * as UserCustomerController from '../../controllers/CompanyUser/companyCustomer'
import { validateRequest } from "../../middleware/Validation/validation";
import { customerSchema } from "../../middleware/Validation/product/customer.validate";

const router = express.Router();

router.post('/create-customer',validateRequest(customerSchema),UserCustomerController.createCustomer);
router.get("/all-company-customers",UserCustomerController.getAllCompanyCustomers)
router.get("/:customer_id",UserCustomerController.getCustomer)
router.put("/:customer_id",UserCustomerController.updateCustomer)

export default router
