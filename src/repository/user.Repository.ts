import { User } from "../models/user.model"; // Import required models
import ResetPassword from "../models/resetPassword.model";

// Find a user document by their email address
export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
};

// Update a user document by ID with provided data
// Returns true if update was successful
export const updateById = async (id: string, data: any) => {
  try {
    await User.findByIdAndUpdate(id, data);
    return true;
  } catch (error) {
    console.error("Error in updateById:", error);
    throw error;
  }
};

// Find a user document by their MongoDB ObjectId
export const findUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
};

// Find a user document associated with a specific company ID
export const findUserByCompanyId = async (companyId: string) => {
  try {
    const user = await User.findOne({ companyId });
    return user;
  } catch (error) {
    console.error("Error in findUserByCompanyId:", error);
    throw error;
  }
};

// Create a new user document with provided user data
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

// Delete a password reset token document for a specific user
export const deleteToken = async (userId: any) => {
  try {
    await ResetPassword.deleteOne({
      userId,
    });
    return true;
  } catch (error) {
    console.error("Error in deleteToken:", error);
    throw error;
  }
};

// Create a new password reset token document for a user
export const createResetPasswordToken = async (data: any) => {
  try {
    const resetPasswordToken = new ResetPassword(data);
    await resetPasswordToken.save();
    return resetPasswordToken;
  } catch (error) {
    console.error("Error in createResetPasswordToken:", error);
    throw error;
  }
};