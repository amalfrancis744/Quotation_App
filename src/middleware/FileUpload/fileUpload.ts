import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { s3Client } from "../../config/s3.config";
import { ERROR_MSGS } from "../../utils/constant";

// Allowed file types and size
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error(ERROR_MSGS.INVALID_FILE_TYPE), false);
  }
  cb(null, true);
};



// Generate unique filename
export const generateFileName = (file: Express.Multer.File): string => {
  const fileExtension = path.extname(file.originalname);
  return `${randomUUID()}${fileExtension}`;
};

// S3 upload configuration
export const uploadS3 = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
    files:1
  },
  fileFilter,
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME || "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req: Request, file: Express.Multer.File, cb: Function) => {
      const fileName = generateFileName(file);
      const folderPath = "products";
      cb(null, `${folderPath}/${fileName}`);
    },
  }),
});
// Error handler middleware
import { ErrorRequestHandler } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from 'http-status';

export const handleUploadError: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      GlobleResponse.error({
        msg: ERROR_MSGS.FILE_SIZE_EXCEEDED,
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR
      });
      return;
    }
    res.status(400).json({ res: false, message: error.message });
    return;
  }

  if (error) {
    res.status(400).json({ res: false, message: error.message });
    return;
  }
  next();
};

// Upload middleware for single file
export const uploadSingle = uploadS3.single("file");
