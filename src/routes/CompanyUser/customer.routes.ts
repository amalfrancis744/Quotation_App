import express, { Router } from "express";
import  * as UserCustomerController from '../../controllers/CompanyUser/companyCustomer'
import { validateRequest } from "../../middleware/Validation/validation";
import { customerSchema } from "../../middleware/Validation/customer/customer.validate";
import { updateCustomerSchema } from "../../middleware/Validation/customer/updateCustomer.validate";

const router = express.Router();

router.post('/create-customer',validateRequest(customerSchema),UserCustomerController.createCustomer); //create new customer

router.get("/all-company-customers",UserCustomerController.getAllCompanyCustomers) //get all company customers list
router.get("/:customer_id",UserCustomerController.getCustomer) //get a specific customer data

router.put("/:customer_id",validateRequest(updateCustomerSchema),UserCustomerController.updateCustomer) //update a spcific customer data 

router.delete("/:customer_id",UserCustomerController.deleteCustomer) // delete a specific customer data

export default router
