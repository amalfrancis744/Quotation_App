import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userRespository from "../../repository/user.Repository";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { forgetPasswordMail } from "../../services/nodemailer";
dotenv.config();

// for company user login

export const loginCompanyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDETIALS,
      });
    }
    const user = await userRespository.findUserByEmail(email);
    if (!user) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_EMAIL,
      });
    }

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.INVALID_PASSWORD,
        });
      }
    }
    const SCERET_KEY = process.env.USER_JWT_SECRET || "mysceretkey";

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      SCERET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const userResponse = {
      _id: user._id,
      email: user.email,
    };

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      data: {
        user: userResponse,
        token,
      },
      msg: INFO_MSGS.SUCCESSFUL_LOGIN,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// reset password

export const forgotPassword = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { email } = req.body;

    if (!email) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDETIALS,
      });
    }

    email = email.toLowerCase();
    const user = await userRespository.findUserByEmail(email);
    if (!user) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.USER_NOT_FOUND,
      });
    }

    // delete previously  generated token for user
    await userRespository.deleteToken(user._id);

    let resetToken = crypto.randomBytes(32).toString("hex");
    let tokenHex = await bcrypt.hash(resetToken, 10);
    let expireTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes
    let tokenDetail = await userRespository.createResetPasswordToken({
      userId: user._id,
      resetToken: tokenHex,
      expiresAt: expireTime
    });

    let url = `${process.env.BACKEND_URL}/auth/password-reset?id=${tokenDetail.userId}&token=${tokenDetail.resetToken}`;
    console.log("reset url==>", url);
    await forgetPasswordMail(url, email);

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.RESET_EMAIL,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
