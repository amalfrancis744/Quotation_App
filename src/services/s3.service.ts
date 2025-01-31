import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3.config";
import path from 'path'
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

      return await getSignedUrl(this.s3Client, command, { expiresIn: 600000});
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
      if (oldKey) {
        await this.deleteFile(oldKey);
      }

      const newFileName = this.generateFileName(file);
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: `products/${newFileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      });

      await this.s3Client.send(command);
      return command.input.Key as string;
    } catch (error) {
      console.error("Error updating file:", error);
      throw error;
    }
  }
}
