import mongoose from "mongoose";
import Quotation from "../models/quotation.model";



// Repository function to check if JNo exists
export const findWithFeild = async (jNo: string) => {
    try {
      const quotation = await Quotation.findOne({
        jNo,
        isDeleted: false
      });
      return quotation;
    } catch (error) {
      console.error("Error in findWithFeild:", error);
      throw error;
    }
  };

  export const findQuotationsByCompany = async(company:string)=>{

    try{
  
      const quotations = await Quotation.find({company:company,isDeleted:false})
      return quotations
  
    }
    catch(error)
    {
      console.error("Error in findQuotationsByCompany", error);
      throw error;
    }
  }

  export const findQuotationById = async (id: string) => {
    try {
        const quotation = await Quotation.findOne({ _id: id,isDeleted:false }).populate([
            {
              path: 'contractor',
              select: 'name email phone',
            },
            {
              path: 'items.product',
              select: 'name price description',
            },
          ]);
        return quotation;
    } catch (error) {
        console.error('Error in findQuotationById:', error);
        throw error;
    }
};

export const updateById =  async(id:string,updateData:any)=>{

    try{
        const updatedQuotation = await Quotation.findByIdAndUpdate(
            id,
            {$set:updateData},
            {new: true,
            runValidators: true }
        )
        if (!updatedQuotation) {
            throw new Error('Quotation not found');
        }

        return updatedQuotation;

    }
    catch(error)
    {
        console.error("Error in updateById", error);
        throw error;
    }
}