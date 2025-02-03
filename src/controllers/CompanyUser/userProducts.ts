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
    const { userId, company } = req.user;
    if (!userId || !company) {
      GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
      return;
    }

    // Verify if company exists
    const companyData = await companyRepository.findCompanyById(company);
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
      company: company,
      sukCode,
      hsn,
      description,
      productImage: {
        key: file.key,
        imageUrl: signedUrl,
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
      isDeleted: false,
    });

    if (existingProduct) {
      GlobleResponse.error({
        res,
        status: httpStatus.CONFLICT,
        msg: ERROR_MSGS.PRODUCT_ALREADY_EXISTS,
      });
      return;
    }

    // Create new product
    const newProduct = await userProductRepository.InsertData(productData);

    GlobleResponse.success({
      res,
      status: httpStatus.CREATED,
      msg: INFO_MSGS.COMPANY_CREATED_SUCCESSFULLY,
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
    const { userId, company } = req.user;
    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
    }

    // checking comapnyId is valid
    const comapnyData = await companyRepository.findCompanyById(company);

    if (!comapnyData) {
      return GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
    }
    //  Query parameter for pagination and sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as string)?.toLowerCase() === "asc" ? 1 : -1;
    const includeDeleted = req.query.includeDeleted === "true";
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Add isDeleted filter
    const filter = {
      company: company,
      ...(includeDeleted ? {} : { isDeleted: false }),
    };

    const products: any = await userProductRepository.findAll(filter, {
      skip,
      limit,
      sort: { [sortBy]: order },
    });
    const [ProductsList] = await processProductUrl([products]);

    // total count pf products for pagination
    const totalProducts = await userProductRepository.CountAllProducts({
      company: company,
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
export const getProduct = async (req: any, res: Response): Promise<void> => {
  try {
    // Check authentication
    const { userId, company } = req.user;
    // console.log("productId",req.params)
    if (!userId || !company) {
      GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
      return;
    }

    // Verify company exists
    const companyData = await companyRepository.findCompanyById(company);
    if (!companyData) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
      return;
    }

    // Get product ID from route parameters
    const productId = req.params.product_id;
    if (!productId) {
      GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_PRODUCT_ID,
      });
      return;
    }

    // Find product with company validation
    const product = await userProductRepository.findOneByFeild({
      _id: productId,
      company: company,
      isDeleted: false,
    });
    if (!product) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.PRODUCT_NOT_FOUND,
      });
      return;
    }
    const [processedProduct] = await processProductUrl([product]);
    GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.PRODUCT_FETCHED,
      data: processedProduct,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a specific product
export const updateProduct = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, company } = req.user;
    if (!userId || !company) {
      GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
      return;
    }

    // Verify company exists
    const companyData = await companyRepository.findCompanyById(company);
    if (!companyData) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
      return;
    }
    // Get product ID from route parameters
    const productId = req.params.product_id;
    if (!productId) {
      GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_PRODUCT_ID,
      });
      return;
    }

    // Find product with company validation
    const product = await userProductRepository.findOneByFeild({
      _id: productId,
      company: company,
      isDeleted: false,
    });
    if (!product) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.PRODUCT_NOT_FOUND,
      });
      return;
    }
    // Update product details
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

    // If updating sukCode, check for duplicates
    if (sukCode && sukCode !== product.sukCode) {
      const existingProduct = await userProductRepository.findOneByFeild({
        sukCode,
        isDeleted: false,
        _id: { $ne: productId }, // Exclude current product
      });

      if (existingProduct) {
        GlobleResponse.error({
          res,
          status: httpStatus.CONFLICT,
          msg: ERROR_MSGS.PRODUCT_ALREADY_EXISTS,
        });
        return;
      }
    }

    if (name && name !== product.name) {
      const existingProductWithName =
        await userProductRepository.findOneByFeild({
          name,
          isDeleted: false,
          _id: { $ne: productId }, // Exclude current product
        });

      if (existingProductWithName) {
        GlobleResponse.error({
          res,
          status: httpStatus.CONFLICT,
          msg: "Product with this name already exists",
        });
        return;
      }
    }

    if (req.file) {
      const s3Service = new S3Service();
      // Get the old key if it exists
      const oldKey = product.productImage?.key;
      if (oldKey) {
        await s3Service.deleteFile(oldKey);
      }
      // Ge signed URL for the new file
      const signedUrl = await s3Service.getSignedUrl(req.file.key);

      // Update product image details
      product.productImage = {
        key: req.file.key,
        imageUrl: signedUrl,
      };
    }
    product.name = name || product.name;
    product.category = category || product.category;
    product.sukCode = sukCode || product.sukCode;
    product.hsn = hsn || product.hsn;
    product.description = description || product.description;
    product.gstPercentage = gstPercentage
      ? Number(gstPercentage)
      : product.gstPercentage;
    product.mrp = mrp ? Number(mrp) : product.mrp;
    product.saleRate = saleRate ? Number(saleRate) : product.saleRate;
    product.excubleGST = excubleGST ? Number(excubleGST) : product.excubleGST;
    product.discountPercentage = discountPercentage
      ? Number(discountPercentage)
      : product.discountPercentage;

    const updatedProduct = await userProductRepository.UpdateById(
      productId,
      product
    );

    GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.PRODUCT_UPDATED_SUCCESSFULLY,
      data: updatedProduct,
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteProduct = async (req: any, res: Response): Promise<void> => {
  try {
    const { userId, company } = req.user;
    if (!userId || !company) {
      return GlobleResponse.error({
        res,
        status: httpStatus.UNAUTHORIZED,
        msg: "Unauthorized access",
      });
    }

    // Verify company exists
    const companyData = await companyRepository.findCompanyById(company);
    if (!companyData) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.COMAPNY_NOT_FOUND,
      });
      return;
    }
    // Get product ID from route parameters
    const productId = req.params.product_id;
    if (!productId) {
      GlobleResponse.error({
        res,
        status: httpStatus.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_PRODUCT_ID,
      });
      return;
    }

    // Find product with company validation
    const product = await userProductRepository.findOneByFeild({
      _id: productId,
      company: company,
      isDeleted: false,
    });
    if (!product) {
      GlobleResponse.error({
        res,
        status: httpStatus.NOT_FOUND,
        msg: ERROR_MSGS.PRODUCT_NOT_FOUND,
      });
      return;
    }

    // Mark product as deleted
    const softDeletedProduct = await userProductRepository.UpdateById(productId, {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: userId,
    });

    GlobleResponse.success({
      res,
      status: httpStatus.OK,
      msg: INFO_MSGS.PRODUCT_DELETED_SUCCESSFULLY,
      data: { productId: softDeletedProduct._id },
    });
  } catch (error) {
    return GlobleResponse.error({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      msg: error instanceof Error ? error.message : String(error),
    });
  }
};
