import multer from "multer";
import { ERROR_MSGS } from "../../utils/constant";

const memoryStorage = multer.memoryStorage();

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// File filter function
const fileFilter: any = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error(ERROR_MSGS.INVALID_FILE_TYPE), false);
  }
  cb(null, true);
};

export const uploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
  fileFilter, // Reuse the same file filter
});
