import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userRepository from "../../repository/user.Repository";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import ResetPassword from "../../models/resetPassword.model";
import { forgetPasswordMail } from "../../services/nodemailer";
dotenv.config();

// for company user login

export const loginCompanyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDENTIALS,
      });
    }
    const user = await userRepository.findUserByEmail(email);
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

// forgot password
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
        msg: ERROR_MSGS.INVALID_CREDENTIALS,
      });
    }

    email = email.toLowerCase();
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.USER_NOT_FOUND,
      });
    }

    // delete previously  generated token for user
    await userRepository.deleteToken(user._id);

    let resetToken = crypto.randomBytes(32).toString("hex");
    let tokenHex = await bcrypt.hash(resetToken, 10);
    let expireTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes
    let tokenDetail = await userRepository.createResetPasswordToken({
      userId: user._id,
      resetToken: tokenHex,
      expiresAt: expireTime,
    });

    let url = `${process.env.BACKEND_URL}/auth/verify-token?id=${tokenDetail.userId}&token=${tokenDetail.resetToken}`;
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

export const verifyUrl = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id, token } = req.query;
    let tokenExist = await ResetPassword.findOne({
      userId: id,
      resetToken: token,
    });
    if (!tokenExist) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_TOKEN,
      });
    }

    let currentTime = new Date().getTime();
    if (new Date(tokenExist.expiresAt).getTime() < currentTime) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.TOKEN_EXPIRED,
      });
    }

    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.TOKEN_VALID,
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
export const resetPassword = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, token, newPassword } = req.body;

    if (!id || !token || !newPassword) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDENTIALS,
      });
    }
    const user = await userRepository.findUserById(id);
    const tokenExist = await ResetPassword.findOne({
      userId: id,
      resetToken: token,
    });
    if (!user || !tokenExist) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_TOKEN,
      });
    }

    if (tokenExist) {
      let passswordHex = await bcrypt.hash(newPassword, 10);
      await userRepository.updateById(id, { password: passswordHex });
      await ResetPassword.deleteOne({ userId: id, resetToken: token });
    }
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.PASSWORD_CHANGED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};


