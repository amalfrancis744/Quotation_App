import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { IProduct } from "../../interfaces/product.interfaces";
import { ERROR_MSGS, INFO_MSGS } from "../../utils/constant";
import * as userProductRepository from "../../repository/product.Repository";
import { S3Service } from "../../services/s3.service";
import { User } from "../../models/user.model";
import * as companyRepository from "../../repository/company.Repository";
import { processProductUrl } from "../../utils/processProductUrl";
export const createProduct = async (req: any, res: Response): Promise<void> => {
  try {
    // Check user authentication and company ID
    const { userId, companyId } = req.user;
    if (!userId || !companyId) {
      GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
      return;
    }

    // Verify if company exists
    const companyData = await companyRepository.findCompanyById(companyId);
    if (!companyData) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
      return;
    }

    if (!req.file) {
      GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.IMAGE_REQUIRED,
      });
      return;
    }

    const file = req.file as Express.MulterS3.File;
    const s3Service = new S3Service();
    const signedUrl = await s3Service.getSignedUrl(file.key);
    console.log("signedUrl===>", signedUrl);

    const {
      name,
      category,
      sukCode,
      hsn,
      description,
      gstPercentage,
      discountPercentage,
      mrp,
      saleRate,
      excubleGST,
    } = req.body;

    if (
      !name ||
      !category ||
      !sukCode ||
      !hsn ||
      !description ||
      !mrp ||
      !saleRate
    ) {
      GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.MISSING_FEILDS,
      });
      return;
    }

    const productData: Partial<IProduct> = {
      name,
      category,
      company: companyId,
      sukCode,
      hsn,
      description,
      productImage: {
        key: file.key,
        imageUrl: signedUrl,
        orginalname: file.originalname,
        signedUrl: signedUrl,
      },
      gstPercentage: gstPercentage ? Number(gstPercentage) : undefined,
      mrp: Number(mrp),
      saleRate: saleRate ? Number(saleRate) : undefined,
      excubleGST: excubleGST ? Number(excubleGST) : undefined,
      discountPercentage: discountPercentage
        ? Number(discountPercentage)
        : undefined,
    };

    // Check if product with same sukCode already exists
    const existingProduct = await userProductRepository.findOneByFeild({
      sukCode,
    });

    if (existingProduct) {
      GlobleResponse.error({
        res,
        status: httpStatus.CONFLICT,
        msg: "Product with this SKU code already exists",
      });
      return;
    }

    // Create new product
    const newProduct = await userProductRepository.InsertData(productData);

    GlobleResponse.success({
      res,
      status: httpStatus.CREATED,
      msg: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getCompanyProducts = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, companyId } = req.user;
    console.log(req.user);
    if (!userId || !companyId) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
    }

    // checking comapnyId is valid

    const comapnyData = await companyRepository.findCompanyById(companyId);
    if (!comapnyData) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    // get products of company

    //  Query parameter for pagination and sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as string)?.toLowerCase() === "asc" ? 1 : -1;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const products: any = await userProductRepository.findAll(
      { company: companyId },
      {
        skip,
        limit,
        sort: { [sortBy]: order },
      }
    );

    const [ProductsList] = await processProductUrl([products]);

    // total count pf products for pagination

    const totalProducts = await userProductRepository.CountAllProducts({
      company: companyId,
    });

    GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.COMPANY_PRODUCT_FETCHED,
      data: {
        ProductsList,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          totalItems: totalProducts,
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Retrieve a specific product

// export const getProduct = async (
//   req: any,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Check authentication
//     const { userId, companyId } = req.user;
//     if (!userId || !companyId) {
//       GlobleResponse.error({
//         res,
//         status: httpStatus.UNAUTHORIZED,
//         msg: ERROR_MSGS.UNAUTHORIZED_ACCESS,
//       });
//       return;
//     }

//     // Verify company exists
//     const companyData = await companyRepository.findCompanyById(companyId);
//     if (!companyData) {
//       GlobleResponse.error({
//         res,
//         status: httpStatus.NOT_FOUND,
//         msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
//       });
//       return;
//     }

//     // Get product ID from route parameters
//     const productId = req.params.productId;
//     if (!productId) {
//       GlobleResponse.error({
//         res,
//         status: httpStatus.BAD_REQUEST,
//         msg: ERROR_MSGS.INVALID_PRODUCT_ID,
//       });
//       return;
//     }

//     // Find product with company validation
//     const product = await userProductRepository.findOneByFeild({
//       _id: productId,
//       company: companyId,
//     });

//     if (!product) {
//       GlobleResponse.error({
//         res,
//         status: httpStatus.NOT_FOUND,
//         msg: ERROR_MSGS.PRODUCT_NOT_FOUND,
//       });
//       return;
//     }

//     // Process product image URL
//     const [processedProduct] = await processProductUrl([product]);

//     GlobleResponse.success({
//       res,
//       status: httpStatus.OK,
//       msg: INFO_MSGS.PRODUCT_FETCHED,
//       data: processedProduct,
//     });
//   } catch (error) {
//     return GlobleResponse.error({
//       res,
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       msg: error instanceof Error ? error.message : String(error),
//     });
//   }
// };