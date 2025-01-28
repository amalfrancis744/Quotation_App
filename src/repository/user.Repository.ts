import { User } from "../models/user.model";
import ResetPassword from "../models/resetPassword.model";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
};

export const findUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
}

// Repository function for finding a user by companyId
export const findUserByCompanyId = async (companyId: string) => {
    try {
      const user = await User.findOne({ companyId });
      return user;
    } catch (error) {
      console.error("Error in findUserByCompanyId:", error);
      throw error;
    }
  };

  // Repository function for creating a user
export const createUser = async (userData: any) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  };

  export const deleteToken = async (userId: any) => {

    try{
      await ResetPassword.deleteOne({
        userId
      })
      return true

    }
    catch(error)
    {
      console.error("Error in deleteToken:", error);
      throw error;
    }
  }
  
  export const createResetPasswordToken = async (data:any)=>{
    try{
      const resetPasswordToken = new ResetPassword(data);
      await resetPasswordToken.save();
      return resetPasswordToken;
     
    }
    catch(error)
    {
      console.error("Error in createResetPasswordToken:", error);
      throw error;
    }
  } 
  


