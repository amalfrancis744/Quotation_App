import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userProductRepository from "../../repository/product.Repository";
import * as userQuotationRepository from "../../repository/quotation.Repository";
import * as companyRepository from "../../repository/company.Repository";
import * as companyCustomerRepository from "../../repository/customer.Repository";
import Quotation from "../../models/quotation.model";
import { generateQuotationPDF } from "../../services/pdfGenerator";

export const createQuotation = async (
  req: any,
  res: Response
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
    // Extract quotation data from request body
    const {
      contractor, // customer
      items,
      jNo,
      party,
      email,
      billQty,
      salesMan,
      discPercentage,
      netAmount,
      grossAmount,
      overallDiscount,
      quotationFormat,
      totalAmount,
    } = req.body;

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_ITEMS,
      });
    }
    // Validate each product in items array
    for (const item of items) {
      if (!item.product) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.PRODUCT_ID_REQUIRED,
        });
      }
      // Check if product exists and belongs to the company  && also checking product is not deleted
      const validProduct = await userProductRepository.findOneByFeild({
        _id: item.product,
        company,
        isDeleted: false,
      });
      if (!validProduct) {
        return GlobleResponse.error({
          res,
          status: httpStatus.NOT_FOUND,
          msg: `Product with ID ${item.product} not found or doesn't belong to this company`,
        });
      }
    }
    let customerId = contractor;
    //   validate this customer under this comapny
    const isCustomerValid =
      await companyCustomerRepository.getCustomerWithCompanyDetails(
        customerId,
        company
      );
    if (!isCustomerValid) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.CUSTOMER_NOT_FOUND,
      });
    }

    // Check if JNo already exists
    const isJNoExists = await userQuotationRepository.findWithFeild(jNo);
    if (isJNoExists) {
      return GlobleResponse.error({
        res,
        status: httpStatus.CONFLICT,
        msg: ERROR_MSGS.JNO_ALREADY_EXISTS,
      });
    }
    // Create new quotation
    const newQuotation = new Quotation({
      company,
      contractor: customerId,
      items,
      jNo,
      party,
      email,
      billQty,
      salesMan,
      discPercentage,
      netAmount,
      grossAmount,
      overallDiscount,
      totalAmount,
      quotationFormat,
    });

    const savedQuotation = await newQuotation.save();

    return GlobleResponse.success({
      res,
      status: httpStatus.CREATED,
      data: savedQuotation,
      msg: INFO_MSGS.QUOTATION_CREATED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// List all quotations for the current company
export const getAllCompaniesQuotation = async (
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

    // fetch all quotation under this company
    const quotations = await userQuotationRepository.findQuotationsByCompany(
      company._id
    );
    if (quotations.length === 0 || quotations === null) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.NO_QUOTATION_FOUND,
      });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.QUOTATION_RETRIEVED,
      data: quotations,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Retrieve a specific quotation
export const getQuotation = async (
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

    const { quotation_id } = req.params;
    const quotation = await userQuotationRepository.findQuotationById(
      quotation_id
    );
    if (!quotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_NOT_FOUND,
      });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      data: quotation,
      msg: INFO_MSGS.QUOTATION_RETRIEVED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a specific quotation (including status).

export const updateQuation = async (
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
    const { quotation_id } = req.params;
    const quotation = await userQuotationRepository.findQuotationById(
      quotation_id
    );
    if (!quotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_NOT_FOUND,
      });
    }
    // Extract update data from request body
    const {
      contractor,
      items,
      jNo,
      party,
      email,
      billQty,
      salesMan,
      discPercentage,
      netAmount,
      grossAmount,
      overallDiscount,
      quotationFormat,
      totalAmount,
      status,
    } = req.body;

    // If JNo is being updated, check if it exists in other quotations
    if (jNo && jNo !== quotation.jNo) {
      const existsJnoWithOtherQuotations =
        await userQuotationRepository.findWithFeild(jNo);
      if (existsJnoWithOtherQuotations) {
        return GlobleResponse.error({
          res,
          status: httpStatus.CONFLICT,
          msg: ERROR_MSGS.JNO_ALREADY_EXISTS,
        });
      }
    }

    // If contractor is updated, validate the new customer
    if (contractor && contractor !== quotation.contractor.toString()) {
      const isCustomerValid =
        await companyCustomerRepository.getCustomerWithCompanyDetails(
          contractor,
          company
        );
      if (!isCustomerValid) {
        return GlobleResponse.error({
          res,
          status: httpStatus.NOT_FOUND,
          msg: ERROR_MSGS.CUSTOMER_NOT_FOUND,
        });
      }
    }

    // If items are updated, validate all products
    if (items && Array.isArray(items)) {
      if (items.length === 0) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.INVALID_ITEMS,
        });
      }

      for (const item of items) {
        if (!item.product) {
          return GlobleResponse.error({
            res,
            status: httpStatus.BAD_REQUEST,
            msg: ERROR_MSGS.PRODUCT_ID_REQUIRED,
          });
        }

        const validProduct = await userProductRepository.findOneByFeild({
          _id: item.product,
          company,
          isDeleted: false,
        });

        if (!validProduct) {
          return GlobleResponse.error({
            res,
            status: httpStatus.NOT_FOUND,
            msg: `Product with ID ${item.product} not found or doesn't belong to this company`,
          });
        }
      }
    }
    const updateData = {
      ...(contractor && { contractor }),
      ...(items && { items }),
      ...(jNo && { jNo }),
      ...(party && { party }),
      ...(email && { email }),
      ...(status && { status }),
      ...(billQty && { billQty }),
      ...(salesMan && { salesMan }),
      ...(discPercentage !== undefined && { discPercentage }),
      ...(netAmount && { netAmount }),
      ...(grossAmount && { grossAmount }),
      ...(overallDiscount !== undefined && { overallDiscount }),
      ...(quotationFormat && { quotationFormat }),
      ...(totalAmount && { totalAmount }),
      updatedBy: userId,
      updatedAt: new Date(),
    };

    const update = await userQuotationRepository.updateById(
      quotation_id,
      updateData
    );
    if (!update) {
      return GlobleResponse.error({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        msg: "Failed to update quotation",
      });
    }
    return GlobleResponse.success({
      res,
      data: update,
      msg: INFO_MSGS.QUOTATION_UPDATED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteQuotation = async (
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
    const { quotation_id } = req.params;
    const quotation = await userQuotationRepository.findQuotationById(
      quotation_id
    );
    if (!quotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_NOT_FOUND,
      });
    }

    const deleteQuotation = await userQuotationRepository.updateById(
      quotation_id,
      { isDeleted: true, deletedAt: new Date(), deletedBy: userId }
    );
    if (!deleteQuotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        msg: ERROR_MSGS.QUOTATION_DELETE_FAILED,
      });
    }
    GlobleResponse.success({
      res,
      msg: INFO_MSGS.QUOTATION_DELETED_SUCCESSFULL,
      status: httpStatus.OK,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// List all items in a specific quotation
export const getQuotationItemsById = async (
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
    const { quotation_id } = req.params;
    const quotation = await userQuotationRepository.findQuotationById(
      quotation_id
    );
    if (!quotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_NOT_FOUND,
      });
    }
    const { items } = quotation;

    if (items.length === 0) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.NO_ITEMS_IN_QUOTATION,
      });
    }
    return GlobleResponse.success({
      res,
      data: items,
      status: httpStatus.OK,
      msg: INFO_MSGS.ITEMS_FETCHED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update an item in a quotation

export const updateQuotationItemById = async (
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
    const { quotation_id, item_Id } = req.params;
    const quotationWithItem =
      await userQuotationRepository.checkQuotationItemExists(
        quotation_id,
        item_Id
      );
    if (!quotationWithItem) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_ITEM_NOT_FOUND,
      });
    }
    const { product_id, price, quantity } = req.body;

    // check the product is existsing
    const validProduct = await userProductRepository.findOneByFeild({
      _id: product_id,
      company,
      isDeleted: false,
    });

    if (!validProduct) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: `Product with ID ${product_id} not found or doesn't belong to this company`,
      });
    }

    const updatedItem = await userQuotationRepository.updateQuotationItem(
      item_Id,
      { product_id: product_id, price: price, quantity: quantity }
    );

    if (!updatedItem) {
      return GlobleResponse.error({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        msg: ERROR_MSGS.ITEM_UPDATION_FAILED,
      });
    }

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.ITEM_UPDATION_SUCCESSFULLY,
    });

    // Update item in quotation
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteQuotationItemById = async (
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
    const { quotation_id, item_Id } = req.params;
    const quotationWithItem =
      await userQuotationRepository.checkQuotationItemExists(
        quotation_id,
        item_Id
      );
    if (!quotationWithItem) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_ITEM_NOT_FOUND,
      });
    }

    const deleteItem = await userQuotationRepository.deleteQuotationItem(
      item_Id
    );

    if (deleteItem) {
      return GlobleResponse.success({
        res,
        msg: INFO_MSGS.QUOTATION_ITEM_DELETED_SUCCESSFULLY,
        status: httpStatus.OK,
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

export const generateQuotationPdf = async (
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

    const { quotation_id } = req.params;
    const quotation = await userQuotationRepository.findQuotationById(
      quotation_id
    );
    if (!quotation) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.QUOTATION_NOT_FOUND,
      });
    }
    const pdfDoc = await generateQuotationPDF(quotation);

    return GlobleResponse.success({
      res,
      data: {
        pdfDoc,
        quotation,
      },
    });
  } catch (error) {}
};
