import express, { Response, Request, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userRepository from "../../repository/user.Repository";

// get user profile detailes
export const getUserProfile = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: ERROR_MSGS.AUTH_FAILED,
      });
    }

    // Validate userId
    if (!userId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_CREDENTIALS,
      });
    }

    // Fetch user data
    const userData = await userRepository.findUserById(userId as string);

    if (!userData) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.USER_NOT_FOUND,
      });
    }

    // Return success response
    return GlobleResponse.success({
      res,
      status: httpStatus.OK,
      data: userData, // Include user data in the response
      msg: INFO_MSGS.USER_DATA_FETCHED,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
