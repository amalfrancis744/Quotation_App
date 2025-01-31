import mongoose from "mongoose";

import Product from "../models/product.model";

export const findOneByFeild = async (data: any) => {
  try {
    const product = await Product.findOne(data);
    return product;
  } catch (error) {
    throw error;
  }
};

export const InsertData = async (data: any) => {
  try {
    const product = new Product(data);
    await product.save();
  } catch (error) {
    throw error;
  }
};

export const findByIdAndPopulate = async (id: mongoose.Types.ObjectId) => {
  try {
    const product = await Product.findById(id).populate("company");
    return product;
  } catch (error) {
    throw error;
  }
};

export const findAll = async (
  filters: any,
  options?: { skip?: number; limit?: number; sort?: any }
) => {
  try {
    const { skip = 0, limit = 10, sort = {} } = options || {};

    const allProducts = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate({
        path: 'company',
        select: `companyName
        alias
        mobileNo
        state
        email
        addresses
        accountDetails
        website
        isDeleted
        deletedAt
        createdAt
        updatedAt`,
        model: 'Company'
      });

    return allProducts;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

export const CountAllProducts = async (data: any) => {
  try {
    const allCount = await Product.countDocuments(data);
    return allCount;
  } catch (error) {
    throw error;
  }
};

export const UpdateById = async (id: string, updateData: any) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  } catch (error) {
    console.error("Error in UpdateById:", error);
    throw error;
  }
};
