import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as companyCustomerRepository from "../../repository/customer.Repository";
import * as companyRepository from "../../repository/company.Repository";

// create new customer
export const createCustomer = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { userId, company } = req.user; //checking user is valid with token-middleware req.user

    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        msg: ERROR_MSGS.AUTH_FAILED,
        status: httpStatus.UNAUTHORIZED,
      });
    }
    // Verify if company exists
    const companyData = await companyRepository.findCompanyById(company);
    if (!companyData) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
      return;
    }

    const { name, email, mobileNo } = req.body;

    if (!name || !email || !mobileNo) {
      return GlobleResponse.error({
        res,
        msg: ERROR_MSGS.MISSING_FEILDS,
        status: httpStatus.BAD_REQUEST,
      });
    }

    //   check the customer already exist(pass name ,email,mobile)
    const { nameExists, emailExists, mobileExists } =
      await companyCustomerRepository.FindCustomerByAll(
        name,
        email,
        company,
        mobileNo
      );

    const existingFields = {
      name: !!nameExists,
      email: !!emailExists,
      mobileNo: !!mobileExists,
    };

    // Check if any field exists
    const hasExistingFields = Object.values(existingFields).some(
      (value) => value
    );

    // Create descriptive message
    let message = "";
    if (hasExistingFields) {
      const duplicates = [];
      if (existingFields.name) duplicates.push("name");
      if (existingFields.email) duplicates.push("email");
      if (existingFields.mobileNo) duplicates.push("mobile number");
      message = `Customer already exists with: ${duplicates.join(", ")}`;
    }

    if (hasExistingFields) {
      return GlobleResponse.error({
        res,
        msg: message,
        status: httpStatus.CONFLICT,
      });
    }

    // Create new customer
    const newCustomer = await companyCustomerRepository.createCustomer({
      name,
      email,
      mobileNo,
      company: company,
      isDeleted: false,
    });

    if (newCustomer) {
      return GlobleResponse.success({
        res,
        msg: INFO_MSGS.CUSTOMER_CREATED,
        data: newCustomer,
        status: httpStatus.CREATED,
      });
    }
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// List all customers for the current company.
export const getAllCompanyCustomers = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, company } = req.user;

    // Validate user and company
    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.AUTH_FAILED,
      });
    }

    // Fetch customers by company
    const customers = await companyCustomerRepository.getCustomersByCompany(
      company
    );

    //no customers found
    if (!customers.length) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.NO_CUSTOMERS_FOUND,
      });
    }

    return GlobleResponse.success({
      res,
      msg: INFO_MSGS.CUSTOMERS_LISTED,
      status: httpStatus.OK,
      data: customers,
    });
  } catch (error) {
    // Handle unexpected errors
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

//Retrieve a specific customer
export const getCustomer = async (req: any, res: Response): Promise<void> => {
  try {
    const { userId, company } = req.user;
    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.AUTH_FAILED,
      });
    }
    const { customer_id } = req.params;

    const customer = await companyCustomerRepository.findCustomerByIdandCompany(
      customer_id,
      { company }
    );
    if (customer) {
      return GlobleResponse.success({
        res,
        msg: INFO_MSGS.CUSTOMER_RETRIEVED,
        status: httpStatus.OK,
        data: customer,
      });
    }
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a specific customer
export const updateCustomer = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { userId, company } = req.user;

    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.AUTH_FAILED,
      });
    }

    const { customer_id } = req.params;

    // Check if the customer is valid
    const customer = await companyCustomerRepository.findCustomerById(
      customer_id
    );

    if (!customer) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.CUSTOMER_NOT_FOUND,
      });
    }

    const { name, email, phone } = req.body;

    // Update customer detail
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.mobileNo = phone || customer.mobileNo;

    await customer.save();

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.CUSTOMER_UPDATED,
      data: customer,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};


// Remove an item from a quotation
export const deleteCustomer = async (
  req: any,
  res: Response,
): Promise<void> => {
  try {
    const { userId, company } = req.user;
    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.AUTH_FAILED,
      });
    }
    const { customer_id } = req.params;
    // Check if the customer is valid
    const customer = await companyCustomerRepository.findCustomerById(
      customer_id
    );

    if (!customer) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.CUSTOMER_NOT_FOUND,
      });
    }

    // Soft delete the customer
    customer.isDeleted = true;
    customer.deletedAt = new Date();
    customer.deletedBy = userId;

    await customer.save();

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.CUSTOMER_DELETED,
      data: { customerId: customer_id },
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
