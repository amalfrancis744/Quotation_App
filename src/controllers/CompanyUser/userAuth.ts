import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userRespository from "../../repository/user.Repository";
import jwt from "jsonwebtoken";

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, email, password, companyId } = req.body;

    // Check for missing credentials
    if (!firstName || !lastName || !email || !password || !companyId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: "Credentials are missing",
      });
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

    // Check if the companyId is already associated with another user
    const existingCompanyUser = await userRespository.findUserByCompanyId(
      companyId
    );
    if (existingCompanyUser) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: "This company is already associated with another user.",
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
