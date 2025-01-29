import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userRespository from "../../repository/user.Repository";
import * as companyRepository from "../../repository/company.Repository";
import mongoose from "mongoose";

// for adding companyUser 
export const AddCompanyUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { firstName, lastName, email, password, companyId } = req.body;


    // Check for missing credentials
    if (!firstName || !lastName || !email || !password || !companyId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDENTIALS,
      });
    }
    if(!mongoose.Types.ObjectId.isValid(companyId)){

        return GlobleResponse.error({
            res,
            status: httpStatus.BAD_REQUEST,
            msg: ERROR_MSGS.INVALID_COMPANY_ID,
        })
    }

    // Check if email already exists
    const existingUser = await userRespository.findUserByEmail(email);
    if (existingUser) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_EXISTS,
      });
    }


    // check companyID is Valid
   const existingCompany = await  companyRepository.findCompanyById(companyId)
    if(!existingCompany){
        return GlobleResponse.error({
            res,
            status: httpStatus.BAD_REQUEST,
            msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
        })

    }
  
    // Check if the companyId is already associated with another user
    const existingCompanyUser = await userRespository.findUserByCompanyId(
      companyId
    );
    
    if (existingCompanyUser) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.COMPANY_ALREADY_USE
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await userRespository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      companyId,
    });

    return GlobleResponse.success({
      res,
      status: httpStatus.CREATED,
      msg: INFO_MSGS.SUCCESSFUL_REGISTER,
      data: newUser,
    });
  } catch (error) {
    console.error("Error in RegisterUser:", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "An error occurred while registering the user.",
    });
  }
};
