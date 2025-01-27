import { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS, STATUS_CODE } from "../../utils/constant";
import * as bcrypt from 'bcrypt';
import * as adminRepository from "../../repository/admin.Repository";

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await adminRepository.findAdminByUsername(username);
    if (existingAdmin) {
      // Use the GlobleResponse for consistent error handling
      return GlobleResponse.error({
        res,
        status: httpStatus.CONFLICT, // Use 409 Conflict status
        msg: ERROR_MSGS.EMAIL_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createAdmin = await adminRepository.createAdmin({
      username,
      password: hashedPassword,
    });

    // Existing success response
    const obj = {
      res,
      status: STATUS_CODE.CREATED,
      msg: INFO_MSGS.SUCCESSFUL_REGISTER,
      data: { username },
    };
    return GlobleResponse.success(obj);
  } catch (error) {
    // Catch and handle any unexpected errors
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
