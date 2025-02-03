import { Response, Request, NextFunction, response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import * as userRespository from "../../repository/user.Repository";
import { TokenPayload } from "../../interfaces/auth.interfaces";
import { GlobleResponse } from "../../utils/response";
import { ERROR_MSGS } from "../../utils/constant";

export const authUserMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const token = authHeader.split(" ")[1];
    const SCERET_KEY = process.env.USER_JWT_SECRET;
    const decoded = jwt.verify(token, SCERET_KEY!) as TokenPayload;
    const user = await userRespository.findUserById(decoded.userId);
    if (!user) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.INVALID_TOKEN,
      });
    }

    // check if user is active
    if (!user.isActive) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.USER_NOT_ACTIVE,
      });
    }

    req.user = {
      userId: user._id,
      email: user.email,
      company: user.company,
      isActive: user.isActive,
    };
    next();
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
