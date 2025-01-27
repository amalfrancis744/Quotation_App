import { User } from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
};

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
  
  


