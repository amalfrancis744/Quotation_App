import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { ERROR_MSGS } from "../../utils/constant";
import mongoose from "mongoose";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return GlobleResponse.error({
          res,
          status: httpStatus.BAD_REQUEST,
          msg: ERROR_MSGS.VALIDATION_ERROR,
          data: errors,
        });
      }
      GlobleResponse.error({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        msg: ERROR_MSGS.INTERNAL_ERROR,
      });
    }
  };
};

// Common validators that can be reused across schemas
export const commonValidators = {
  id: (message = ERROR_MSGS.INVALID_ID) =>
    z.string().min(1,"Company id is required").refine((val) => mongoose.Types.ObjectId.isValid(val), message),

};
