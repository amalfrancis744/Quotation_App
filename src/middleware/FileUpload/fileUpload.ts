import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { s3Client } from "../../config/s3.config";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ERROR_MSGS } from "../../utils/constant";

// Generate unique filename
export const generateFileName = (file: Express.Multer.File): string => {
  const fileExtension = path.extname(file.originalname);
  return `${randomUUID()}${fileExtension}`;
};

// Generate S3 public URL
const getS3Location = (bucket: string, region: string, key: string): string => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

// Middleware to handle S3 upload
export const uploadToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return GlobleResponse.error({
      res,
      status: httpStatus.BAD_REQUEST,
      msg: "No file uploaded",
    });
  }

  try {
    const fileName = generateFileName(req.file);
    const folderPath = "products";
    const key = `${folderPath}/${fileName}`;
    const bucket = process.env.AWS_BUCKET_NAME!;
    const region = process.env.AWS_REGION || "us-east-1";

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      Metadata: {
        fieldName: req.file.fieldname,
      },
    });

    await s3Client.send(command);

    // Enrich req.file with S3 metadata
    Object.assign(req.file, {
      key,
      location: getS3Location(bucket, region, key),
      bucket,
      acl: "public-read",
      metadata: {
        fieldName: req.file.fieldname,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Error handler middleware
import { ErrorRequestHandler } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";

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
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
      return;
    }
    res.status(400).json({ msg: error.message });
    return;
  }

  if (error) {
    res.status(400).json({ msg: error.message });
    return;
  }
  next();
};

// Upload middleware for single file
