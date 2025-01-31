import { S3Service } from "../services/s3.service";
import * as userProductRepository from "../repository/product.Repository";

const isUrlExpired = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    const expiresIn = url.searchParams.get("X-Amz-Expires");
    const dateString = url.searchParams.get("X-Amz-Date");

    if (!expiresIn || !dateString) {
      return true;
    }

    // Convert AWS date format (YYYYMMDDTHHMMSSZ) to ISO format
    const creationDate = dateString.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
      "$1-$2-$3T$4:$5:$6Z"
    );

    // Calculate expiration timestamp
    const creationTimestamp = Math.floor(Date.parse(creationDate) / 1000);
    const expirationTimestamp = creationTimestamp + parseInt(expiresIn, 10);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log(currentTimestamp,expirationTimestamp)
    return currentTimestamp > expirationTimestamp;
  } catch (error) {
    console.error(`Error checking URL expiration: ${error}`);
    return true;
  }
};

export const processProductUrl = async (product: any[]): Promise<any[]> => {
  const updatePromises = product.map(async (product) => {
    if (
      product?.[0].productImage?.imageUrl &&
      isUrlExpired(product?.[0].productImage.imageUrl)
    ) {
      try {
        // Generate new signed URL
        const s3Service = new S3Service();
        const newUrl = await s3Service.getSignedUrl(
          product?.[0].productImage.key
        );

        // Update product in database
        await userProductRepository.UpdateById(product._id, {
          "productImage.imageUrl": newUrl,
        });

        // Update URL in current product object
        product.productImage.imageUrl = newUrl;
      } catch (error) {
        console.error(`Error updating URL for product ${product._id}:${error}`);
      }
    }
    return product;
  });
  return Promise.all(updatePromises);
};


