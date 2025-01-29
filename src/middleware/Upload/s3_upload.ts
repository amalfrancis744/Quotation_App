import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import fs from "fs";
import { S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextFunction } from "express-serve-static-core";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Allowed file types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// File filter function
const fileFilter = (req: any, file: any, cb: any) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(
      new Error(
        "Invalid file type. Only JPEG, PNG and WEBP files are allowed."
      ),
      false
    );
  }
  cb(null, true);
};

// Generate unique filename
const generateFileName = (file: any) => {
  const fileExtension = path.extname(file.originalname);
  return `${randomUUID()}${fileExtension}`;
};

// S3 upload configuration
export const uploadS3 = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
  storage: multerS3({
    s3: s3Client,
    bucket:
      process.env.AWS_BUCKET_NAME ||
      (() => {
        throw new Error("AWS_BUCKET_NAME is not defined");
      })(),
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = generateFileName(file);
      const folderPath = "products"; // Customize folder path as needed
      cb(null, `${folderPath}/${fileName}`);
    },
  }),
});

// Error handler middleware
export const handleUploadError = (
  error: any,
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: `File size too large. Maximum size is ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`,
      });
    }
    return res.status(400).json({ error: error.message });
  }

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

// Upload middleware for single product image
export const uploadProductImage = uploadS3.single("productImage");
