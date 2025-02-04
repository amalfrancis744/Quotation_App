import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as adminRepository from "../../repository/admin.Repository";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

// for admin creation routes
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await adminRepository.findAdminByUsername(username);
    if (existingAdmin) {
      // Use the GlobleResponse for consistent error handling
      return GlobleResponse.error({
        res,
        status: httpStatus.CONFLICT, // Use 409 Conflict status
        msg: ERROR_MSGS.USERNAME_EXITS,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await adminRepository.createAdmin({
      username,
      password: hashedPassword,
    });

    // Existing success response
    const obj = {
      res,
      status: httpStatus.CREATED,
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

// for admin login
export const loginAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find admin
    const admin = await adminRepository.findAdminByUsername(username);
    if (!admin) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.USER_NOT_FOUND,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.INVALID_PASS,
      });
    }

    const SCERET_KEY = process.env.ADMIN_JWT_SECRET || "mysceretkey";

    // Generate token
    const token = jwt.sign({ adminId: admin._id },SCERET_KEY, {
      expiresIn: '1h',
    });

    // Successful login response
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.SUCCESSFUL_LOGIN,
      data: { token },
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
