import status from "http-status";
import { Company } from "../models/comapny.model";

export const findAllCompanies = async () => {
  try {
    const allCompany = await Company.find();
    return allCompany;
  } catch (error) {
    throw error;
  }
};

export const findCompanyNameByCompany = async (companyName: string) => {
  try {
    const company = await Company.findOne({
      companyName: {
        $regex: new RegExp(`^${companyName}$`, "i"),
      },
    });
    return company;
  } catch (error) {
    throw error;
  }
};

export const findEmailByCompany = async (email: string) => {
  try {
    const company = await Company.findOne({ email });

    return company;
  } catch (error) {
    throw error;
  }
};

export const findCompanyById = async (id: string) => {
  try {
    // No need for {_id: id}, can pass id directly to findById
    const company = await Company.findById(id);
    return company;
  } catch (error) {
    throw error;
  }
};

// find email by email and companyId

export const findEmailByEmailCompanyId = async (
  normalizedEmail: string,
  companyId: string
) => {
  try {
    const getEmail = await Company.findOne({
      email: normalizedEmail,
      _id: { $ne: companyId },
    });
    return getEmail;
  } catch (error) {
    throw error;
  }
};

export const findCompayByCompanyNameAndSame = async (
  companyName: string,
  companyId: string
) => {
  try {
    const company = await Company.findOne({
      companyName,
      _id: { $ne: companyId },
    });
    return company;
  } catch (error) {
    throw error;
  }
};

export const findByIdAndUpdate = async (id: string, data: any) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedCompany;
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw error;
  }
};
