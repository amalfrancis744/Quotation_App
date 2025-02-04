import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS } from "../../utils/constant";
import * as adminRepository from "../../repository/admin.Repository";
import { adminTokenPayload } from '../../interfaces/auth.interfaces';



export const adminAuthMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.NO_TOKEN,
      });
    }
    if (!authHeader.startsWith("Bearer")) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.INVALID_TOKEN,
      });
    }

    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.NO_TOKEN,
      });
    }

    try {
      // Verify token
      const SCERET_KEY = process.env.ADMIN_JWT_SECRET;
      const decoded = jwt.verify(token, SCERET_KEY!) as adminTokenPayload
      const admin = await adminRepository.findAdminById(decoded.adminId);

      if (!admin) {
        return GlobleResponse.error({
          res,
          status: httpStatus.UNAUTHORIZED,
          msg: ERROR_MSGS.INVALID_TOKEN,
        });
      }

      req.admin = {
        adminId : admin._id
      }
      next();
    } catch (err) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.INVALID_TOKEN,
      });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Token has expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Invalid token",
      });
    }

    console.error("Auth middleware error:", error);
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Authentication failed",
    });
  }
};
