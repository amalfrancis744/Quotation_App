import { Request, Response, NextFunction } from "express";
import { GlobleResponse } from "../../utils/response";
import httpStatus from "http-status";
import { IProduct } from "../../interfaces/product.interfaces";
import { ERROR_MSGS } from "../../utils/constant";
import * as userProductRepository from '../../repository/product.Repository'

export const createProduct = async (req: any, res: Response): Promise<void> => {
  try {
    // if (!req.file) {
    //   GlobleResponse.error({
    //     res,
    //     status: httpStatus.BAD_REQUEST,
    //     msg: ERROR_MSGS.IMAGE_REQUIRED,
    //   });
    //   return;
    // }

    const file = await  req.file as Express.MulterS3.File;
    console.log(file)
    console.log("body data",req.body)

    const {
      name,
      category,
      company,
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
      !company ||
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
      company,
      sukCode,
      hsn,
      description,
      productImage: {
        key: file.key,
        imageUrl: file.location,
        orginalname: file.originalname,
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
    const existingProduct = await userProductRepository.findOneByFeild({ sukCode });
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

    // Populate company details in the response
    // const populatedProduct = await userProductRepository.findByIdAndPopulate(newProduct._id)
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
