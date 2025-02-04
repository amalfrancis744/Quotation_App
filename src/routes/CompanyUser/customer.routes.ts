import express, { Router } from "express";
import  * as UserCustomerController from '../../controllers/CompanyUser/companyCustomer'
import { validateRequest } from "../../middleware/Validation/validation";
import { customerSchema } from "../../middleware/Validation/customer/customer.validate";
import { updateCustomerSchema } from "../../middleware/Validation/customer/updateCustomer.validate";

const router = express.Router();

router.post('/create-customer',validateRequest(customerSchema),UserCustomerController.createCustomer);
router.get("/all-company-customers",UserCustomerController.getAllCompanyCustomers)
router.get("/:customer_id",UserCustomerController.getCustomer)
router.put("/:customer_id",validateRequest(updateCustomerSchema),UserCustomerController.updateCustomer)
router.delete("/:customer_id",UserCustomerController.deleteCustomer)

export default router
