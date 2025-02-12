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
              path: 'company',
              select: 'companyName ',
            },
            {
              path: 'items.product',
              select: 'name price description',
            },
          ])
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

// check the quotation and items exists in the collection
export const checkQuotationItemExists = async (quotationId: string, itemId: string) => {
  try {
      // Validate if the IDs are valid MongoDB ObjectIDs
      if (!mongoose.Types.ObjectId.isValid(quotationId) || !mongoose.Types.ObjectId.isValid(itemId)) {
          return false;
      }

      // Find quotation and check if the specific item exists
      const quotation = await Quotation.findOne({
          _id: quotationId,
          isDeleted: false,
          'items._id': itemId
      });

      // Return true if quotation with the specific item was found, false otherwise
      return quotation

  } catch (error) {
      console.error("Error in checkQuotationItemExists:", error);
      throw error;
  }
};

export const updateQuotationItem = async (item_id: string, data: any) => {
  try {

    // Find the Quotation document that contains the item with the given item_id
    const updateItem = await Quotation.findOneAndUpdate(
      { "items._id": item_id }, // Find the document where the items array contains an item with the given _id
      {
        $set: {
          "items.$.product": data.product_id, // Update product
          "items.$.price": data.price, // Update price
          "items.$.quantity": data.quantity, // Update quantity
        },
      },
      { new: true } // Return the updated document
    );

    if (!updateItem) {
      throw new Error("Quotation item not found");
    }

    return updateItem; // Return the updated document
  } catch (error) {
    console.error(`Error found in the updateQuotationItem:`, error);
    throw error;
  }
};


export const deleteQuotationItem = async(item_id:string)=>{

   try{
    const updatedQuotation = await Quotation.findOneAndUpdate(
      { "items._id": item_id }, // Find the document containing the item
      { $pull: { items: { _id: item_id } } }, // Remove the item from the array
      { new: true } // Return the updated document
    );

    return updatedQuotation;
   }
   catch(error)
   {
    console.error("Error in deleteQuotationItem:", error);
    throw error;
   }

}


