import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as companyRepository from "../../repository/company.Repository";
import { Company } from "../../models/comapny.model";

export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companies = await companyRepository.findAllCompanies();
    if (!companies) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      data: companies,
    });
  } catch (error) {}
};

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    var {
      companyName,
      alias,
      addresses,
      accountDetails,
      website,
      email,
      mobileNo,
      state,
    } = req.body;

    // Add input validation logging
 

    // check company already exists
    const existsCompany = await companyRepository.findCompanyNameByCompany(
      companyName
    );
    
    // Add null/undefined check
    if (existsCompany) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.COMPANY_ALREADY_EXISTS,
      });
    }
    email = email.toLowerCase();
    // Check if company with same email exists
    const checkEmail = await companyRepository.findEmailByCompany(email);

    if (checkEmail) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_ALREADY_EXISTS,
      });
    }

    const company = new Company({
      companyName,
      alias,
      addresses,
      accountDetails,
      website,
      email,
      mobileNo,
      state,
    });

    await company.save();

    return GlobleResponse.success({
      res,
      status: httpStatus.CREATED,
      msg: INFO_MSGS.COMPANY_CREATED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Error creating company",
    });
  }
};

//   get specific company
export const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companyId = req.params.company_id;

    if (!companyId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.COMPANY_ID_REQUIRED,
      });
    }

    const result = await companyRepository.findCompanyById(companyId);

    if (!result) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.COMPANY_FETCHED,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Error fetching company",
    });
  }
};

// Update a specific company
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companyId = req.params.company_id;
    const {
      companyName,
      alias,
      addresses,
      accountDetails,
      website,
      email,
      mobileNo,
      state,
    } = req.body;

    // Validate comapny ID
    if (!companyId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.COMPANY_ID_REQUIRED,
      });
    }
    // Check if company exists
    const existingCompany = await companyRepository.findCompanyById(companyId);
    if (!existingCompany) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    //check email for uniqueneness

    if (email) {
      const normalizedEmail = email.toLowerCase().trim()
    //   console.log("amal=> " ,normalizedEmail," ",email)
      const emailExistes:any = await companyRepository.findEmailByEmailCompanyId(
        normalizedEmail,
        companyId
      );
      if (emailExistes) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.EMAIL_ALREADY_EXISTS,
        });
      }
    }
    if (companyName) {
      const companyExits =
        await companyRepository.findCompayByCompanyNameAndSame(
          companyName,
          companyId
        );
      if (companyExits) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.COMPANY_ALREADY_EXISTS,
        });
      }
    }

    const updateData = {
      ...req.body,
      email: email?.toLowerCase(),
    };

    const updatedData = await companyRepository.findByIdAndUpdate(
      companyId,
      updateData
    );
    if (!updatedData) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.COMPANY_UPDATED_SUCCESSFULLY,
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Error updating company",
    });
  }
};


export const deleteCompany = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{

    try{

        const {company_id} = req.params

        // Validate comapny ID
    if (!company_id) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.COMPANY_ID_REQUIRED,
        });
      }
      // Check if company exists
      const existingCompany = await companyRepository.findCompanyById(company_id);
      if (!existingCompany) {
        return GlobleResponse.error({
          res,
          status: httpStatus.NOT_FOUND,
          msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
        });
      }
       const deleteCompany = await companyRepository.findByIdAndUpdate(company_id,{
        isDeleted: true,
        deletedAt:new Date()
       })

       if(!deleteCompany)
       {
        return GlobleResponse.error({
            res,
            status:httpStatus.BAD_REQUEST,
            msg:ERROR_MSGS.DELETE_FAILED
        })
       }

       return GlobleResponse.success({
        res,
        status:httpStatus.OK,
        msg:ERROR_MSGS.COMPANY_DELETED
       })


    }
    catch(error)
    {
        console.error("Error updating company:", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Error updating company",
    });
        

    }
}

