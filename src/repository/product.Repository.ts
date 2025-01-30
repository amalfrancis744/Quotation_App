import mongoose from "mongoose";

import Product from "../models/product.model";

export const findOneByFeild = async (data:any) => {
  try {
  const product = await Product.findOne({data})
  return product
  } catch (error) {
    throw error;
  }
};


export const InsertData = async (data:any) => {
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