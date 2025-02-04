import { Company } from "../models/comapny.model";

// Retrieve all companies from the database
export const findAllCompanies = async () => {
  try {
    const allCompany = await Company.find({isDeleted: false});
    return allCompany;
  } catch (error) {
    throw error;
  }
};

// Find a company by exact company name (case-insensitive)
export const findCompanyNameByCompany = async (companyName: string) => {
  try {
    const company = await Company.findOne({
      companyName: {
        $regex: new RegExp(`^${companyName}$`, "i"),
      },
      isDeleted: false,
    });
    return company;
  } catch (error) {
    throw error;
  }
};

// Find a company by email address
export const findEmailByCompany = async (email: string) => {
  try {
    const company = await Company.findOne({ email, isDeleted: false });
    return company;
  } catch (error) {
    throw error;
  }
};

// Find a company by its MongoDB ObjectId
export const findCompanyById = async (id: string) => {
  try {
    const company = await Company.findOne({ _id: id, isDeleted: false });
    return company;
  } catch (error) {
    throw error;
  }
};

// Find a company by email, excluding a specific company ID
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

// Find a company by name, excluding a specific company ID
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

// Update a company by ID with new data
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