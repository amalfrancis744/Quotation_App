import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3.config";
import path from "path";
import { randomUUID } from "crypto";

export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = s3Client;
    this.bucket = process.env.AWS_BUCKET_NAME || "";
  }

  async getSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command);
    } catch (error) {
      console.error("Error generating signed URL:", error);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  // Generate unique filename
  private generateFileName(file: any): string {
    const fileExtension = path.extname(file.originalname);
    return `${randomUUID()}${fileExtension}`;
  }

  async updateFile(oldKey: string, file: Express.Multer.File): Promise<string> {
    try {
      // Delete old file if exists
      if (oldKey) {
        await this.deleteFile(oldKey);
      }

      // Generate new filename and set path
      const newFileName = this.generateFileName(file);
      const key = `products/${newFileName}`;

      // Create upload command
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype, // Use the MIME type from the file object
        Metadata: {
          fieldName: file.fieldname,
        },
      });

      // Upload new file
      await this.s3Client.send(command);

      // Return the new file key
      return key;
    } catch (error) {
      console.error("Error updating file:", error);
      throw error;
    }
  }
}
